const client = require('../config/auth');
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
                    return res.status(200).send("Refresh token saved successfully!");
                } else {
                    req.user = await UserModel.create({
                        _id: payload.sub,
                        name: payload.name,
                        email: payload.email,
                        picture: payload.picture,
                        refreshToken: refreshToken,
                    });
                    return res.status(200).send("Refresh token of a new user saved successfully!");
                }
            } else {
                return res.status(403).send("Forbidden Error");
            }
        } catch (error) {
            return res.status(500).send('Error handling OAuth callback');
        }
    },
    refreshToken: async function (req, res) {
        try {
            const accessToken = req.accessToken;
            return res.status(200).json({ accessToken });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
}
module.exports = authController;