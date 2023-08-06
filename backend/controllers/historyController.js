const HistoryModel = require("../models/HistoryModel");
const UserModel = require('../models/UserModel');
const mongoose = require("mongoose");
const { Types } = mongoose;

const historyController = {

    addHistoryItem: async function (req, res, next) {
        try {
            console.log(req.user);
            const user = await UserModel.findById(req.user._id);
            // If this occurs, the something is wrong with the middleware
            if (!user) {
                res.status(404).send("User not found");
            }
            const historyDocument = new HistoryModel(req.body);
            const savedModel = await historyDocument.save();

            user.history.push(new Types.ObjectId(savedModel._id));
            await user.save();

            res.status(201).json(savedModel);
        } catch (err) {
            if (err.name === "ValidationError") {
                return res.status(400).json({ error: "Invalid Request" });
            }
            console.error(err.message);
            res.status(500).send(err.message);
        }
    },

    updateHistoryFavourite: async function (req, res, next) {
        try {
            const historyId = req.params.id;
            const history = await HistoryModel.findById(historyId);
            if (!history) {
                return res.status(404).send("History Item not found");
            }
            history.favourite = req.body.favourite;
            const savedModel = await history.save();
            res.status(200).json(savedModel);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    clearHistory: async function (req, res, next) {
        try {
            const user = await UserModel.findById(req.user._id);
            if (!user) {
                return res.status(404).send("User not found");
            }
            const historyIds = user.history;
            user.history = [];
            await user.save();

            await HistoryModel.deleteMany({ _id: { $in: historyIds } });

            res.status(204).send("History cleared");
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
};

module.exports = historyController;