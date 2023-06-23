const Book = require("../models/bookModel");

const createBook = async (data) => {
  const { bookID, title, price } = data;
  const newBook = new Book({ bookID, title, price });
  return await newBook.save();
};

const getAllBooks = async () => await Book.find({});

const getBooks = async (titleBook) =>
  await Book.find({ title: titleBook });

const getBookByID = async (bookID) => await Book.findById(bookID);

module.exports = {
  createBook,
  getAllBooks,
  getBooks,
  getBookByID,
};
