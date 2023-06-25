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

const getBooksBySearch = async (req, res) => {
  try {
    let books;

    // If the user wants to search by Book Title
    if(req.query.title)
      books = await booksDbService.getBooksBySearch({ title: req.query.title});
    else if(req.query.author) // If the user wants to search by the Book's Author
      books = await booksDbService.getBooksBySearch({ author: req.query.author });
    else
      return res.status(404).json({ error: "Books not found", success: false });

    console.log('Matching Books:', books);

    if (books.length === 0) {
      console.log('No matching books found');
      return res.status(404).json({ error: "Books not found", success: false });
    }

    console.log('Successfully retrieved the book or books as requested');
    res.status(200).json(books);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error", success: false });
  }
};



// Only an admin can use this post call
const createBookByAdmin = async (req, res) => {
  try {
    const newBook = await booksDbService.createBookByAdmin(req.body);
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

const updateBookDescriptions = async (req, res) => {
  try {
    await booksDbService.updateBookDescriptions();
    res.status(200).json({ message: "Book descriptions updated successfully" });
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({ error: "An error occurred while updating book descriptions" });
  }
};


const getBooksByGenre = async (req, res) => {
  const { genre } = req.params;
    try {
        const books = await booksDbService.getBooksByGenre(genre);
        console.log('Successfully retrieved all books by genre')
        res.status(200).json(books);
    }catch (err) {
      console.log(err);
      res
        .status(404)
        .json({ error: "Couldn't find books by genre", success: false });
    }
}


// Other controller methods...
// Update (Price, Quantity, etc.), Delete,


module.exports = {
  getAllBooks,
  getBookByID,
  getBooksBySearch,
  createBookByAdmin,
  updateBookImages,
  updateBookDescriptions,
  getBooksByGenre,
};



