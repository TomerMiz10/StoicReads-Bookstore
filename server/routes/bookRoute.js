const express = require("express");
const bookRoute = express.Router();

const {
  getAllBooks,
  getBooksBySearch,
  getBookByID,
  getBooksByGenre,
  createBookByAdmin,
  updateBookCoverImages,
} = require("../controllers/bookController");

bookRoute.get("/getAllBooks", getAllBooks);
bookRoute.get("/search", getBooksBySearch);
bookRoute.get("/update-images", updateBookCoverImages); // Updates existing books in the document with images
bookRoute.get("/bookId/:bookID", getBookByID);
bookRoute.get("/genre/:genre", getBooksByGenre);

bookRoute.post("/createBook", createBookByAdmin);

module.exports = bookRoute;
