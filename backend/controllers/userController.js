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
    }
};

module.exports = userController;
