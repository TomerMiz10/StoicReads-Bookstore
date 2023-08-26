const Book = require("../models/Book");
const {getBookDetails} = require('./googlebookService');
const axios = require('axios');
const {extractBookCoverImage} = require("./bookimagesService");

async function generateUniqueRandomID() {
    let randomID;
    let exists;

    do {
        randomID = Math.floor(Math.random() * 1001); // Generate random number between 0 and 1000
        exists = await Book.exists({bookID: randomID}); // Check if the ID exists in the database
    } while (exists);

    return randomID;
}


const createBook = async (title, author, price, quantity, bookURL) => {

    try {

        const response = await axios.get(bookURL);
        const bookDetails = response.data;

        const description = bookDetails.volumeInfo.description;
        let publishedDate = bookDetails.volumeInfo.publishedDate;

        if (publishedDate.includes('-')) {
            publishedDate = bookDetails.volumeInfo.publishedDate.slice(0, 4);
        }

        const genre = bookDetails.volumeInfo.categories && bookDetails.volumeInfo.categories[0] ? bookDetails.volumeInfo.categories[0] : "Novel";
        const imageURL = await extractBookCoverImage(title, author);

        const bookID = Number(await generateUniqueRandomID());

        const newBook = new Book(
            {
                bookID, title, price, image: imageURL, author,
                description, genre, yearOfPublishment: publishedDate, quantity
            }
        );

        return await newBook.save();
    } catch (error) {
        console.log(error);
        throw new Error('An error occurred when attempting to create a new Book.');
    }
};


const deleteBook = async (bookID) => {
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

async function changeBookQuantity(bookID, newQuantity) {
    try {
        return await Book.findOneAndUpdate(
            {bookID: bookID},
            {$set: {quantity: newQuantity}},
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
    changeBookQuantity,
};

