const Book = require("../models/Book");
const {getBookDetails} = require('./googlebookService');
const axios = require('axios');
const {extractBookCoverImage} = require("./bookimagesService");

const createBook = async (title, author) => {

    try {
        const bookDetails = await getBookDetails(title);
        const {description} = bookDetails;
        const imageURL = await extractBookCoverImage(title, author);

        const bookID = Number(await Book.findOne({}, {}, {sort: {bookID: -1}})) + 1;
        const newBook = new Book({bookID, title, price: 0, image: imageURL, description});

        return await newBook.save();
    } catch (error) {
        console.log(error);
        throw new Error('An error occurred when attempting to create a new Book.');
    }
};


const deleteBook = async (bookID) => {
    console.log(bookID)
    return Book.findOneAndDelete({bookID});
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

