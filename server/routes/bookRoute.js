const express = require("express");
const bookRoute = express.Router();

const {
  getAllBooks,
  getBooks,
  getBookByID,
  createBook,
  updateBookImages,
} = require("../controllers/bookController");

// Retrieves all the books
bookRoute.get("/books", getAllBooks);
// Retrieves a book or books matching a title
bookRoute.get("/search", getBooks);
// Updates existing books in the document with images
bookRoute.get("/update-images", updateBookImages);
// Retrieves a book by it's ID (bookID)
bookRoute.get("/book/:bookID", getBookByID);

bookRoute.post("/", createBook);

module.exports = bookRoute;
