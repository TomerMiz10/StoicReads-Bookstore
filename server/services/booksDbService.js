const Book = require("../models/Book");
const {getBookDetails, extractBookDescription} = require('./googlebookService');
const {extractBookCoverImage} = require('./bookimagesService');

const axios = require('axios');

const getAllBooks = async () => await Book.find({});
const getBooksBySearch = async (query) => {
    const searchQuery = {};

    if (query.title) {
        searchQuery.title = {$regex: query.title, $options: "i"};
    }

    if (query.author) {
        searchQuery.author = {$regex: query.author, $options: "i"};
    }

    return Book.find(searchQuery);
};

const getBookByID = async (bookID) => await Book.findOne({bookID});

const getBooksByGenre = async (genre) => await Book.find({genre});

const getGoogleBooksDetails = async (title) => {
    const response = await getBookDetails(title);
    return response.data;
};

module.exports = {
    getAllBooks,
    getBooksBySearch,
    getBookByID,
    getBooksByGenre,
    getGoogleBooksDetails,
};
