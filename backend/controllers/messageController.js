require('dotenv').config();
const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const MessageController = {
    sendMessage: async function (req, res, next) {
        try {
            const { to, body } = req.body;
          
            client.messages
              .create({
                body: body,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: to,
              })
              .then((message) => {
                console.log('SMS sent successfully. SID:', message.sid);
                res.status(200).json({ success: true });
              })
              .catch((error) => {
                console.error('Error sending SMS:', error.message);
                res.status(500).json({ error: 'Failed to send SMS' });
              });
        } catch (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        }
    }
};

module.exports = MessageController;