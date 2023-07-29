const client = require('../config/auth');
const jwt = require('jose');
const UserModel = require('../models/UserModel');

const authController = {
    oauthCallback: async function (req, res, next) {
        try {
            const authorizationCode = req.query.code;

            const {tokens} = await client.getToken(authorizationCode);

            const refreshToken = tokens.refresh_token;
            const idToken = tokens.id_token;
            const ticket = await client.verifyIdToken({
                idToken,
                audience: process.env.CLIENT_ID,
            });
            const payload = ticket.getPayload();

            if (payload) {
                const user = await UserModel.findOne({ _id: payload.sub });
                if (user) {
                    user.refreshToken = refreshToken;
                    await user.save();
                    res.status(200).send("Refresh token saved successfully!");
                } else {
                    req.user = await UserModel.create({
                        _id: payload.sub,
                        name: payload.name,
                        email: payload.email,
                        picture: payload.picture,
                        refreshToken: refreshToken,
                    });
                    res.status(200).send("Refresh token of a new user saved successfully!");
                }
            } else {
                res.status(403).send("Forbidden Error");
            }
        } catch (error) {
            res.status(500).send('Error handling OAuth callback');
        }
    }
}
module.exports = authController;