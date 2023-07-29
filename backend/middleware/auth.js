const UserModel = require('../models/UserModel');
const client = require('../config/auth');
require('dotenv').config();

async function verifyUser (req, res, next) {
    try {
        const idToken = req.headers.authorization.split(' ')[1];
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (payload) {
            const user = await UserModel.findOne({ _id: payload.sub });
            if (user) {
                req.user = user;
                next();
            } else {
                return res.status(401).json({ message: 'Please Sign In with Google and allow access to this app.' });
            }
        } else {
            return res.status(403).json({ message: 'Forbidden Error' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized Error' });
    }
}

async function refreshTokenMiddleware(req, res) {
    try {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token not provided.' });
        }
        const { tokens } = await client.refreshToken(refreshToken);

        if (!tokens || !tokens.access_token) {
            return res.status(401).json({ message: 'Invalid refresh token.' });
        }

        const user = await UserModel.findOne({ refreshToken });

        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        req.accessToken = tokens.access_token;

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
}
module.exports = {
    verifyUser: verifyUser,
    refreshTokenMiddleware: refreshTokenMiddleware,
};