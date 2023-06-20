const CrimeModel = require("../models/CrimeModel");

const CrimeController = {

    getData: async function (req, res, next) {
        try {
            const item = await CrimeModel.find()
            res.status(200).send(item)
        } catch (err) {
                res.status(500).send(err.message);
        }
    },
    addData: async function (req, res, next) {
        try {
            const item = await CrimeModel.create(req.body);
            res.status(201).send(item)
        } catch (err) {
                res.status(500).send(err.message);
        }
    }
}

module.exports = CrimeController;