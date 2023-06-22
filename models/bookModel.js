// represents a product in the store, with properties like name, price, description
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Book = new Schema({
    _id:{
        type:String,
        required: true,
    },
    bookID: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Book',Book);