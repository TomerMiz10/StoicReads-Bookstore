// represents a user, with properties like name, email, address, etc.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    userID: {type: Number, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    userName: {type: String, required: true, unique: true},
    fullName: {type: String},
    isAdmin: {type: Boolean, required: true}
});

module.exports = mongoose.model('User', User);