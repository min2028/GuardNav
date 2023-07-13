const UserModel = require('../models/UserModel');

const userController = {
    getUser: async function (req, res, next) {
        if (req.user) {
            res.status(200).send(req.user);
        } else {
            res.status(404).send("User not found");
        }
    },
    getUserById: async function (req, res, next) {
        try {
            const user = await UserModel.find({_id: req.userId});
            res.status(201).send(user)
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
};

module.exports = userController;
