const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    _id: { type: String, required: true},
    name: { type: String, required: true },
    email: { type: String, required: true },
    history: [
        {
            from: { type: String, required: true },
            to: { type: String, required: true },
        } ,
    ],
}, {collection: 'users'});

const UserModel = model('User', userSchema);

module.exports = UserModel;