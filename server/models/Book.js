// represents a product in the store, with properties like name, price, description
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Book = new Schema({
    bookID: {
        type: Number,
        required: true,
        unique:true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    yearOfPublishment: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Book', Book)