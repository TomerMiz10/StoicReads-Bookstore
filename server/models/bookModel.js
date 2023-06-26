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
    imageLinks: {
        smallThumbnail: {
            type: String,
            required: false,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        small: {
            type: String,
            required: false,
        },
        medium: {
            type: String,
            required: false,
        },
        large: {
            type: String,
            required: false,
        },
        extraLarge: {
            type: String,
            required: false,
        },
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