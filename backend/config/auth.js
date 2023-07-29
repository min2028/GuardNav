require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
});

module.exports = client;