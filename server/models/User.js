const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail } = require('validator');
const bcrypt = require('bcrypt');

const User = new Schema({
    userID: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: [true,"please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail,'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true,"please enter a password"],
        minlength: [6,"password must be at least 6 characters"]
    },
    userName: {type: String,
        required: [true,"please enter a userName"],
        unique: true
    },
    fullName: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});
User.post('save', function(doc, next) {
    console.log('new user was created & saved', doc);
    next();
});

User.pre('save', async function(next) {
    const salt = await bcrypt.genSaltSync();
    this.password = await bcrypt.hashSync(this.password, salt);
    next();
});
module.exports = mongoose.model('User', User);