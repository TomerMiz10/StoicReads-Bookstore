const axios = require('axios');

const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

// Function to fetch book details from the Google Books API
const getBookDetails = async (title) => {
    const googleBooksAPIUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&key=${apiKey}`;
    const response = await axios.get(googleBooksAPIUrl);
    return response.data;
};

module.exports = {
    getBookDetails,
};