const HistoryModel = require("../models/HistoryModel");
const UserModel = require('../models/UserModel');

const HistoryController = {

    getData: async function (req, res, next) {
        try {
            const item = await HistoryModel.find()
            res.status(200).send(item)
        } catch (err) {
                res.status(500).send(err.message);
        }
    },
    addData: async function (req, res, next) {
        try {
            const users = UserModel.find({_id: req.body.owner_id});
            const validation = HistoryModel.validate(req.body);
            const results = await Promise.all([users, validation]);
            if (results[0].length < 1 && results[1].error) {
                res.status(400).send("user not found or wrong request");
            }
            const historyInstance = new HistoryModel(req.body);
            const savedModel = await historyInstance.save();
            res.status(201).json(savedModel);
        } catch (err) {
                res.status(500).send(err.message);
        }
    }
}

module.exports = HistoryController;