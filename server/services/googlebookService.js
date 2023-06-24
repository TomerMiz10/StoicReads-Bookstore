const axios = require('axios');

const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

// Getting the book details through the API
const getBookDetails = async (title) => {
    const googleBooksAPIUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&key=${apiKey}`;
    const response = await axios.get(googleBooksAPIUrl);
    return response.data;
};

// A function toe extract an image from the API
const extractImageLink = (data) => {
    return data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
};

module.exports = {
    getBookDetails,
    extractImageLink,
};
