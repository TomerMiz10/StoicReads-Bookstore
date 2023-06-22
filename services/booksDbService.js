const Book = require("../models/bookModel");

const createBook = async (data) => {
  const { bookID, title, price } = data;
  const newBook = new Book({ bookID, title, price });
  return await newBook.save();
};

const getAllBooks = async () => await Book.find({}).exec();

const getBooks = async (titleBook) =>
  await Book.find({ title: `${titleBook}` }).exec();

const getBookByID = async (bookID) => await Book.findById(bookID).exec();

module.exports = {
  createBook,
  getAllBooks,
  getBooks,
  getBookByID,
};
