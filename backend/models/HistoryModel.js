const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const LocationSchema = new Schema({
    lat: {
      type: String,
      required: true
    },
    lng: {
      type: String,
      required: true
    },
    formatted_address: {
      type: String,
      required: true
    }
});

const historySchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    from: {
        type: LocationSchema,
        required: true
    },
    to: {
        type: LocationSchema,
        required: true
    },
    risk: {
        type: String,
        required: true
    },
    favourite: {
        type: Boolean,
        default: false
    },
    owner_id: {
        type: String
    }
} , {collection: 'history'});

const HistoryModel = model('History', historySchema);

module.exports = HistoryModel;