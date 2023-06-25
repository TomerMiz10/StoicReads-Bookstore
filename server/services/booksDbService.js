const Book = require("../models/bookModel");
const { getBookDetails, extractImageLink } = require('./googlebookService');

const axios = require('axios');


const createBookByAdmin = async (data) => {
  const { bookID, title, price } = data;

  try {
    const bookDetails = await getBookDetails(title);

    // Extract the relevant book information including the image links
    const { imageLinks } = bookDetails;

    // Create a new book with the extracted information
    const newBook = new Book({ bookID, title, price, imageLinks });

    return await newBook.save();
  } catch (error) {
    console.log(error);
    throw new Error('An error occurred while fetching book details from the Google Books API.');
  }
};

const getAllBooks = async () => await Book.find({});

// A special function intended to update existing books in the DB with images from the API
const updateBookImages = async () => {
  try {
    const books = await getAllBooks();
    for (const book of books) {
      const { title } = book;

      const bookDetails = await getBookDetails(title);
      const imageLink = extractImageLink(bookDetails);

      // Update the book's image link in the database
      await Book.findOneAndUpdate(
          { title: title },
          { $set: { "imageLinks.thumbnail": imageLink } },
          { new: true, useFindAndModify: false }
      );
    }

    console.log('Book images updated successfully.');
  } catch (error) {
    console.log(error);
    throw new Error('An error occurred while updating book images from the Google Books API.');
  }
};


const getBooksBySearch = async (titleBook) =>
  await Book.find({ title: titleBook });

const getBookByID = async (bookID) => await Book.findOne({ bookID });

const getBooksByGenre = async (genre) => await Book.find({ genre });

module.exports = {
  createBookByAdmin,
  getAllBooks,
  getBooksBySearch,
  getBookByID,
  updateBookImages,
    getBooksByGenre,
};
