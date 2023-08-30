const booksDbService = require("../services/booksDbService");
const lodash = require("lodash");
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

const getBookDetailsByObjectID = async (req, res) => {
  try {
    const { bookID } = req.params;
    const book = await booksDbService.getBookByObjectID(bookID);

    if (!book) {
      return res.status(404).json({ error: "Book not found, please make sure it's the correct id", success: false });
    }
    res.status(200).json(book);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error, couldn't fetch book by it's ID", success: false });
  }
};

const getBooksBySearch = async (req, res) => {
  try {
    let books;
    if(req.query.title)
      books = await booksDbService.getBooksBySearch({ title: req.query.title});
    else if(req.query.author)
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

const getBooksByGenre = async (req, res) => {
  let books;
  const { genre } = req.params;
  try {
    if(genre === 'all')  books = await booksDbService.getAllBooks();
    else {
      const groupedBooks = await booksDbService.groupBooksByGenre();
      books = groupedBooks[genre];
    }
    console.log('Successfully retrieved all books by genre')
    res.status(200).json(books);
  }catch (err) {
    console.log(err);
    res
        .status(404)
        .json({ error: "Couldn't find books by genre", success: false });
  }
}


const getGoogleBooksDetails = async (req, res) => {
  const { title } = req.params;
  console.log(title);
  try {
    let books = await booksDbService.getGoogleBooksDetails(title)
    return res.status(200).json(books);
  }catch (err) {
    console.log(err);
    res
        .status(404)
        .json({ error: "Couldn't find books from google books API", success: false });
  }
}


module.exports = {
  getAllBooks,
  getBookByID,
  getBooksBySearch,
  getBooksByGenre,
  getGoogleBooksDetails,
  getBookDetailsByObjectID,
};


