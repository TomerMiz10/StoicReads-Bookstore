// Handling product-realted routes
const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getBooks,
  getBookByID,
  createBook,
} = require("../controllers/bookController");

// Retrieves all the books
router.get("/", getAllBooks);
// Retrieves a book or books matching a title
router.get("/", getBooks);
router.get("/:id", getBookByID);

router.post("/", createBook);

module.exports = bookRoute;
