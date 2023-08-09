const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const crimeSchema = new Schema(
    {
        c_type: { type: String, required: true },
        year: { type: Number, required: true },
        month: { type: Number, required: true },
        hour: { type: Number, required: true },
        lat: { type: Number, required: true },
        lon: { type: Number, required: true },
    },
    { collection: "crimes" }
);

const CrimeModel = model("Crime", crimeSchema);

module.exports = CrimeModel;
