const Book = require("../models/Book");
const {getBookDetails} = require('./googlebookService');

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

const getBooksByGenre = async (genre) => await Book.find({genre});

const getGoogleBooksDetails = async (title) => {
    try {
        const response = await getBookDetails(title);
        const filteredItems = [];

        for (const book of response.items) {
            const title = book.volumeInfo.title;

            if (!(await Book.findOne({ title }))) {
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
};
