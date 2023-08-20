const Book = require("../models/Book");
const {getBookDetails} = require('./googlebookService');
const axios = require('axios');

const createBook = async (title, price) => {

    try {
        const bookDetails = await getBookDetails(title);
        const {imageLinks, description} = bookDetails;

        const bookID = Number(await Book.findOne({}, {}, {sort: {bookID: -1}})) + 1;
        const newBook = new Book({bookID, title, price, imageLinks, description});

        return await newBook.save();
    } catch (error) {
        console.log(error);
        throw new Error('An error occurred when attempting to create a new Book.');
    }
};


const deleteBook = async (bookID) => {
    try {
        return await Book.findOneAndDelete({bookID});
    } catch (error) {
        console.log(error);
        throw new Error('An error occurred when trying to delete a book from DB');
    }
}

const changeBookPrice = async (bookID, newPrice) => {
    try {
        return await Book.findOneAndUpdate(
            {bookID: bookID},
            {$set: {price: newPrice}},
            {new: true, useFindAndModify: false}
        );
    } catch (error) {
        console.log(error);
        throw new Error("An error has occurred when trying to update a book's price");
    }
}


module.exports = {
    createBook,
    deleteBook,
    changeBookPrice,
};

