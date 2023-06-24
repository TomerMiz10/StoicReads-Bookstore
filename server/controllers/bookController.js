// contains methods to handle book-related operations

const booksDbService = require("../services/booksDbService");

const getAllBooks = async (req, res) => {
  try {
    const books = await booksDbService.getAllBooks();
    console.log('Successfully retrieved all books')
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
    const { bookID } = req.params;
    const book = await booksDbService.getBookByID(bookID);

    if (!book) {
      return res.status(404).json({ error: "Book not found, please make sure it's the correct id", success: false });
    }
    console.log('Successfully retrieved a book by its ID')
    res.status(200).json(book);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error, couldn't fetch book by it's ID", success: false });
  }
};

// Will return books or a book with matching title
const getBooks = async (req, res) => {
  try {
    const book = await booksDbService.getBooks(req.query.title);
    console.log('Successfully retrieved the book or books as requested')
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
    console.log('Successfully created a new book and inserted it into the DB')
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

// Update book images from Google Books API
const updateBookImages = async (req, res) => {
  try {
    await booksDbService.updateBookImages();
    res.status(200).json({ message: "Book images updated successfully" });
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({ error: "An error occurred while updating book images" });
  }
};


// Other controller methods...
// Update (Price, Quantity, etc.), Delete,


module.exports = {
  getAllBooks,
  getBookByID,
  getBooks,
  createBook,
  updateBookImages,
};



