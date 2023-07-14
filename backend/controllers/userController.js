const UserModel = require('../models/UserModel');

const userController = {
    getUser: async function (req, res, next) {
        try {
            if (req.user) {
                const userWithHistory = await UserModel.findById(req.user._id).populate('history');
                if (!userWithHistory) {
                    return res.status(404).send("User not found");
                }
                res.status(200).json(userWithHistory);
            } else {
                res.status(404).send("User not found");
            }
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
