const express = require("express");
const bookRoute = express.Router();

const {
    getAllBooks,
    getBooksBySearch,
    getBookByID,
    getBooksByGenre,
} = require("../controllers/bookController");

bookRoute.get("/getAllBooks", getAllBooks);
bookRoute.get("/search", getBooksBySearch);
bookRoute.get("/bookId/:bookID", getBookByID);
bookRoute.get("/genre/:genre", getBooksByGenre);

module.exports = bookRoute;
