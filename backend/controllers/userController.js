const UserModel = require('../models/UserModel');

const userController = {
    getAllUsers: async function (req, res, next) {
        try {
            const users = await UserModel.find()
            res.status(200).send(users)
        } catch (err) {
            res.status(500).send(err.message);
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
