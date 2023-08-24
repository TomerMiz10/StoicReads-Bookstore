const axios = require('axios');

const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

// Function to fetch book details from the Google Books API
const getBookDetails = async (title) => {
    try{
        const googleBooksAPIUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&key=${apiKey}`;
        const response = await axios.get(googleBooksAPIUrl);
        return response.data;
    } catch(err) {
        console.log('Error when fetching the google books API:' + err);
    }

};

module.exports = {
    getBookDetails,
};
