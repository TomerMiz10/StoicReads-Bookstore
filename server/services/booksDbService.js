const Book = require("../models/Book");
const {getBookDetails} = require('./googlebookService');
const lodash = require("lodash");
const getAllBooks = async () => await Book.find({});
const getBooksBySearch = async (query) => {
    const searchQuery = {};

    if (query.title) {
        searchQuery.title = {$regex: query.title, $options: "i"};
    }

    if (query.author) {
        searchQuery.author = {$regex: query.author, $options: "i"};
    }

    return Book.find(searchQuery);
};

const getBookByID = async (bookID) => await Book.findOne({bookID});

const getBookByObjectID = async (bookID) => {
    const res = await Book.findById({_id: bookID});
    return res;
}
const getBooksByGenre = async (genre) => await Book.find({genre});

const groupBooksByGenre = async () => {
    const books = await getAllBooks();
    const groupedBooks = lodash.groupBy(books, "genre");

    // Iterate through each book and split genres
    for (const book of books) {

        if (book.genre.includes(" / ")) {
            const genres = book.genre.split(" / ");

            // Iterate through each genre of the book
            for (const genre of genres) {
                // Check if the genre is already a top-level key in the groupedBooks object
                if (!groupedBooks.hasOwnProperty(genre)) {
                    groupedBooks[genre] = [book]; // Create a new entry with the book
                } else {
                    groupedBooks[genre].push(book); // Add the book to the existing genre
                }
            }
        }

    }

    return groupedBooks;
}

const getGoogleBooksDetails = async (title) => {
    try {
        const response = await getBookDetails(title);
        const filteredItems = [];

        for (const book of response.items) {
            const title = book.volumeInfo.title;

            if (!(await Book.findOne({title}))) {
                // Construct the filteredItem object for this book
                const filteredItem = {
                    kind: book.kind,
                    id: book.id,
                    etag: book.etag,
                    selfLink: book.selfLink,
                    volumeInfo: book.volumeInfo,
                };

                // Push the filteredItem into the filteredItems array
                filteredItems.push(filteredItem);
            }
        }

        const filteredResponse = {
            kind: response.kind,
            totalItems: response.totalItems,
            items: filteredItems
        };

        // Returning books that do not exist in the DB
        return filteredResponse;
    } catch (err) {
        console.log('Error when fetching the google book API details: ' + err);
    }
};


module.exports = {
    getAllBooks,
    getBooksBySearch,
    getBookByID,
    getBooksByGenre,
    getGoogleBooksDetails,
    getBookByObjectID,
    groupBooksByGenre
};
