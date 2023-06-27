const axios = require('axios');

const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

// Function to fetch book details from the Google Books API
const getBookDetails = async (title) => {
    const googleBooksAPIUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&key=${apiKey}`;
    const response = await axios.get(googleBooksAPIUrl);
    return response.data;
};


// Keeping this for now as an example how to extract data from the API
// const extractBookDescription = (data, book) => {
//
//
//     const match = data.items.find((item) => {
//         const itemTitle = item.volumeInfo.title.toLowerCase();
//         const itemAuthors = item.volumeInfo.authors || [];
//         const bookTitle = book.title.toLowerCase();
//         const bookAuthor = book.author.toLowerCase();
//
//         return (
//             (itemTitle === bookTitle && itemAuthors.includes(bookAuthor)) ||
//             itemAuthors.includes(bookAuthor)
//         );
//     });
//
//     return match?.volumeInfo?.description || data.items?.[0]?.volumeInfo?.description;
// };


module.exports = {
    getBookDetails,
};
