const axios = require('axios');

const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

// Function to fetch book details from the Google Books API
const getBookDetails = async (title) => {
    const googleBooksAPIUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&key=${apiKey}`;
    const response = await axios.get(googleBooksAPIUrl);
    return response.data;
};

// Function to extract image links based on matching author or title
const extractImagesLinks = (data, book) => {
    const extractedImageLinks = {};

    // Attempt to find a match between book and API results based on author or title
    const match = data.items.find((item) => {
        const itemTitle = item.volumeInfo.title.toLowerCase();
        const itemAuthors = item.volumeInfo.authors || [];
        const bookTitle = book.title.toLowerCase();
        const bookAuthor = book.author.toLowerCase();

        return (
            (itemTitle === bookTitle && itemAuthors.includes(bookAuthor)) ||
            itemAuthors.includes(bookAuthor)
        );
    });

    // Extract image links from the matched result or fallback to the original extracted links
    const imageLinks = match?.volumeInfo?.imageLinks || data.items?.[0]?.volumeInfo?.imageLinks;

    if (!imageLinks) {
        return extractedImageLinks;
    }

    const sizes = ['smallThumbnail', 'thumbnail', 'small', 'medium', 'large', 'extraLarge'];

    // Iterate over the sizes and add the existing image links to the extractedImageLinks object
    sizes.forEach((size) => {
        if (imageLinks[size]) {
            extractedImageLinks[size] = imageLinks[size];
        }
    });

    return extractedImageLinks;
};

const extractBookDescription = (data, book) => {


    const match = data.items.find((item) => {
        const itemTitle = item.volumeInfo.title.toLowerCase();
        const itemAuthors = item.volumeInfo.authors || [];
        const bookTitle = book.title.toLowerCase();
        const bookAuthor = book.author.toLowerCase();

        return (
            (itemTitle === bookTitle && itemAuthors.includes(bookAuthor)) ||
            itemAuthors.includes(bookAuthor)
        );
    });

    return match?.volumeInfo?.description || data.items?.[0]?.volumeInfo?.description;
};


module.exports = {
    getBookDetails,
    extractImagesLinks,
    extractBookDescription,
};
