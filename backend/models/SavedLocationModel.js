const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const LocationSchema = new Schema({
    lat: {
        type: String,
        required: true,
    },
    lng: {
        type: String,
        required: true,
    },
    formatted_address: {
        type: String,
        required: true,
    },
});

const savedLocationSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        to: {
            type: LocationSchema,
            required: true,
        },
        lat: {
            type: String,
            required: true,
        },
        lng: {
            type: String,
            required: true,
        },
        formatted_address: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    { collection: "saved_location" }
);

const SavedLocationModel = model("SavedLocation", savedLocationSchema);

module.exports = SavedLocationModel;
