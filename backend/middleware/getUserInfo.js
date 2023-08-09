const UserModel = require('../models/UserModel');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();
const axios = require('axios');


async function getUserInfo (req, res, next) {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const response = await axios.get(`${process.env.AUTH0_ISSUERBASEURL}/userinfo`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        if (response) {
            const payload = response.data;
            const user = await UserModel.findOne({ _id: payload.sub });

            if (user) {
                req.user = user;
                next();
            } else {
                req.user = await UserModel.create({
                    _id: payload.sub,
                    name: payload.nickname,
                    email: payload.email,
                    picture: payload.picture,
                });
                next();
            }
        } else {
            return res.status(403).json({ message: 'Forbidden Error' });
        }
    } catch (error) {
        return res.status(405).json({ message: 'Invalid Header' });
    }
}

module.exports = getUserInfo;