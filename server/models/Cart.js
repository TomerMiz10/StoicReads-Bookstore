const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CartItemSchema = new Schema({
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const Cart = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [CartItemSchema]
});

Cart.post('save', function (doc, next) {
    console.log('new cart was created & saved', doc)
    next();
});

module.exports = mongoose.model('Cart', Cart);
