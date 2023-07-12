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
            const users = await UserModel.find({_id: req.body.owner_id});
            if (users.length < 1) {
                res.status(500).send("user not found");
            }
            const item = await HistoryModel.create(req.body);
            res.status(201).send(item)
        } catch (err) {
                res.status(500).send(err.message);
        }
    }
}

module.exports = HistoryController;