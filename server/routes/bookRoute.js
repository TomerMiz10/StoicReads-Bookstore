const express = require("express");
const bookRoute = express.Router();

const {
    getAllBooks,
    getBooksBySearch,
    getBookByID,
    getBooksByGenre,
    getGoogleBooksDetails,
} = require("../controllers/bookController");

bookRoute.get("/getAllBooks", getAllBooks);
bookRoute.get("/search", getBooksBySearch);
bookRoute.get("/bookId/:bookID", getBookByID);
bookRoute.get("/genre/:genre", getBooksByGenre);
bookRoute.get("/getGoogleBooksDetails/:title", getGoogleBooksDetails);
module.exports = bookRoute;
