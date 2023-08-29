const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
    ,items: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [0, 'Quantity cannot be less than zero']
            }
        }
    ],
    orderDate: {
        type: Date,
        default: Date.now
    },
    totalPrice:{
        type: Number,
        required: true,
        min: [0, 'Price cannot be less than zero']
    }
});

module.exports = mongoose.model('Order', Order);