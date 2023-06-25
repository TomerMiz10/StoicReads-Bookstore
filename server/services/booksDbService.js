const Book = require("../models/bookModel");
const { getBookDetails, extractImagesLinks, extractBookDescription } = require('./googlebookService');

const axios = require('axios');


const createBookByAdmin = async (data) => {
  const { bookID, title, price } = data;

  try {
    const bookDetails = await getBookDetails(title);

    // Extract the relevant book information including the image links and description
    const { imageLinks, description } = bookDetails;

    // Create a new book with the extracted information
    const newBook = new Book({ bookID, title, price, imageLinks, description });

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
      const { title, author } = book;

      const bookDetails = await getBookDetails(title);
      const imageLinks = extractImagesLinks(bookDetails, { title, author });

      // Update the book's image links in the database
      await Book.findOneAndUpdate(
          { title: title },
          { $set: { imageLinks: imageLinks } },
          { new: true, useFindAndModify: false }
      );
    }

    console.log('Book images updated successfully.');
  } catch (error) {
    console.log(error);
    throw new Error('An error occurred while updating book images from the Google Books API.');
  }
};


const updateBookDescriptions = async () => {
  try {
    const books = await Book.find();

    for (const book of books) {
      const { title, author } = book;

      const bookDetails = await getBookDetails(title);
      const description = await extractBookDescription(bookDetails, { title, author });

      // Update the book's description in the database
      await Book.findOneAndUpdate(
          { title: title },
          { $set: { description: description } },
          { new: true, useFindAndModify: false }
      );
    }

    console.log('Book descriptions updated successfully.');
  } catch (error) {
    console.log(error);
    throw new Error('An error occurred while updating book descriptions from the Google Books API.');
  }
};



const getBooksBySearch = async (query) => {
  const searchQuery = {};

  if (query.title) {
    searchQuery.title = { $regex: query.title, $options: "i" };
  }

  if (query.author) {
    searchQuery.author = { $regex: query.author, $options: "i" };
  }

  return Book.find(searchQuery);
};


const getBookByID = async (bookID) => await Book.findOne({ bookID });

const getBooksByGenre = async (genre) => await Book.find({ genre });

module.exports = {
  createBookByAdmin,
  getAllBooks,
  getBooksBySearch,
  getBookByID,
  getBooksByGenre,
  updateBookImages,
  updateBookDescriptions,
};
