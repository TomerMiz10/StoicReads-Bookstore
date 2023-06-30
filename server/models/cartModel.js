// represents a cart, with properties like name, email, address, etc.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema({
    userID: {type: Number, required: true, unique: true},
    BookId: {type: Number, required: true, unique: true}
});

module.exports = mongoose.model('Cart', Cart);