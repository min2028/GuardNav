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
                const error = new Error("Please Sign In with Google and allow access to this app.");
                error.status = 401;
                console.log("Error thrown:", error);
                next(error);
            }
        } else {
            const error = new Error("Forbidden Error");
            error.status = 403;
            next(error);
        }
    } catch (error) {
        console.log("Error caught:", error);
        next(error)
    }
}

function authErrorHandler (err, req, res, next) {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
}

module.exports = {
    verifyUser: verifyUser,
    authErrorHandler: authErrorHandler,
};