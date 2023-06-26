const axios = require('axios');

const apiKey = 'AIzaSyDYXySI-D9XnR-o6H8YO2br6f8fKeKA63A';

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

    let thumbnailUrl = imageLinks.thumbnail;
    const zoomMatch = thumbnailUrl.match(/zoom=(\d+)/);
    let zoomValue = zoomMatch ? parseInt(zoomMatch[1]) : 1;


    // Iterate over the sizes and add the existing image links to the extractedImageLinks object
    sizes.forEach((size) => {
        if (imageLinks[size]) {
            extractedImageLinks[size] = imageLinks[size].replace(/^http:\/\//i, 'https://');
        } else if(size === 'extraLarge'){
            extractedImageLinks[size] = thumbnailUrl.replace(/zoom=\d+/,`zoom=${0}` ).replace(/^http:\/\//i, 'https://');
        }else {
            // Modify the thumbnail URL to request a larger version with the desired zoom value
            zoomValue += 1;

            extractedImageLinks[size] = thumbnailUrl.replace(/zoom=\d+/, `zoom=${zoomValue}`).replace(/^http:\/\//i, 'https://');
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
