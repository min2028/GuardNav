const SavedLocationModel = require("../models/SavedLocationModel");
const UserModel = require("../models/UserModel");
const mongoose = require("mongoose");
const { Types } = mongoose;

const savedLocationController = {
    addSavedLocation: async function (req, res, next) {
        try {
            const user = await UserModel.findById(req.user._id);
            if (!user) {
                return res.status(404).send("User not found");
            }
            const savingLocation = new SavedLocationModel(req.body);
            const savedLocation = await savingLocation.save(); // Await the saving of the location
            user.saved_location.push(new Types.ObjectId(savedLocation._id));
            await user.save();

            res.status(201).json(savedLocation); // Return the savedLocation instead of savedModel
        } catch (err) {
            if (err.name === "ValidationError") {
                return res.status(400).json({ error: "Invalid Request" });
            }
            res.status(500).send(err.message);
        }
    },
    deleteSavedLocation: async function (req, res, next) {
        try {
            const user = await UserModel.findById(req.user._id);
            if (!user) {
                return res.status(404).send("User not found");
            }
            console.log(req.param);
            console.log(req.param._id);

            await SavedLocationModel.findByIdAndDelete(req.param._id);

            res.status(204).send();
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
};

module.exports = savedLocationController;
