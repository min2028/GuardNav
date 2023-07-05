const UserModel = require('../models/UserModel');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();


async function verifyUser (req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    try {
        const idToken = req.headers.authorization.split(' ')[1];
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (payload) {
            const user = await UserModel.findOne({ _id: payload.sub });

            console.log("User Email: ", payload.email);

            if (user) {
                req.user = user;
                next();
            } else {
                req.user = await UserModel.create({
                    _id: payload.sub,
                    name: payload.name,
                    email: payload.email,
                    picture: payload.picture,
                });
                next();
            }
        } else {
            const error = new Error("Forbidden Error");
            error.status = 403;
            next(error);
        }
    } catch (error) {
        error.status = 401;
        error.message = "Unauthorized Error";
        next(error)
    }
}

function authErrorHandler (err, req, res, next) {
    if (err.status === 403) {
        res.status(403).json({ error: err.message });
    } else {
        res.status(401).json({ error: err.message });
    }
}

module.exports = {
    verifyUser: verifyUser,
    authErrorHandler: authErrorHandler,
};