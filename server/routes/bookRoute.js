const express = require("express");
const bookRoute = express.Router();

const {
  getAllBooks,
  getBooks,
  getBookByID,
  createBook,
} = require("../controllers/bookController");

// Retrieves all the books
bookRoute.get("/books", getAllBooks);
// Retrieves a book or books matching a title
bookRoute.get("/search", getBooks);
bookRoute.get("/:id", getBookByID);

bookRoute.post("/", createBook);

module.exports = bookRoute;