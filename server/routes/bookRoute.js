const express = require("express");
const bookRoute = express.Router();

const {
  getAllBooks,
  getBooksBySearch,
  getBookByID,
  createBookByAdmin,
  updateBookImages,
  getBooksByGenre,
} = require("../controllers/bookController");

bookRoute.get("/book/getAllBooks", getAllBooks);
bookRoute.get("/book/search", getBooksBySearch);
bookRoute.get("/book/update-images", updateBookImages); // Updates existing books in the document with images
bookRoute.get("/book/bookId/:bookID", getBookByID);
bookRoute.get("/book/genre/:genre", getBooksByGenre);

bookRoute.post("/book/createBook", createBookByAdmin);

module.exports = bookRoute;
