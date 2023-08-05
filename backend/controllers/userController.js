const UserModel = require('../models/UserModel');

const userController = {
    getUser: async function (req, res, next) {
        try {
            if (req.user) {
                const userWithHistory = await UserModel.findById(req.user._id).populate('history');
                console.log(userWithHistory)
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
    updateUserNumber: async function (req, res, next) {
        try {
            if (req.user) {
                const user = await UserModel.findById(req.user._id)
                console.log(user.email)
                if (!user) {
                    return res.status(404).send("User not found");
                }
                if (!req.body.number) {
                    return res.status(400).send("Number is required");
                } else {
                    user.number = req.body.number;
                    await user.save();
                    return res.status(200).json(user);
                }
            } else {
                return res.status(401).send("Unauthorized");
            }
        } catch (err) {
            return res.status(500).send(err.message);
        }
    },
    updateUserName: async function (req, res, next) {
        try {
            if (req.user) {
                const user = await UserModel.findById(req.user._id)
                console.log(user.email)
                if (!user) {
                    return res.status(404).send("User not found");
                }
                if (!req.body.name) {
                    return res.status(400).send("Name is required");
                } else {
                    user.name = req.body.name;
                    await user.save();
                    return res.status(200).json(user);
                }
            } else {
                return res.status(401).send("Unauthorized");
            }
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }
};

module.exports = userController;
