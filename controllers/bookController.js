// contains methods to handle book-related operations

const booksDbService = require("../services/booksDbService");

const getAllBooks = async (req, res) => {
  try {
    const books = await booksDbService.getBooks();
    res.status(200).json(books);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ error: "Couldn`t fetch books 404 error", success: false });
  }
};

// Will return a book by it's ID
const getBookByID = async (req, res) => {
  try {
    const book = await booksDbService.getBook(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ error: "Book not found", success: false });
  }
};

 
// Will return books or a book with matching title
const getBooks = async (req, res) => {
  try {
    const book = await booksDbService.getBooks(req.params.title);
    res.status(200).json(book);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ error: "Book not found", success: false });
  }
};

// Only an admin can use this post call
const createBook = async (req, res) => {
  try {
    const newBook = await booksDbService.createBook(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        error: "An error occurred while creating the product",
        success: false,
      });
  }
};


// Other controller methods...
// Update (Price, Quantity, etc.), Delete,

module.exports = {
  getAllBooks,
  getBookByID,
  getBooks,
  createBook,
};
