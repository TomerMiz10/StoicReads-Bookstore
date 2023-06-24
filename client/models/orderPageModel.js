const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');
const baseUrl = 'http://localhost:3000';

const renderSpecificBookDetails = () => {
    const bookTitle = document.getElementById('bookTitle');
    const bookAuthor = document.getElementById('bookAuthor');
    const bookGenre = document.getElementById('bookGenre');
    const bookPrice = document.getElementById('bookPrice');
    const bookDescription = document.getElementById('bookDescription');
    const bookImage = document.getElementById('bookImage');
    $.ajax({
        url: baseUrl+'/book/bookId/' + bookId,
        type: 'GET',
        success: function(response) {
            const book = response;
            bookTitle.innerHTML = book.title;
            bookAuthor.innerHTML = "<b>By: </b>"+book.author;
            bookGenre.innerHTML ="<b>Genre: </b>"+ book.genre;
            bookPrice.innerHTML ="<b>Price: </b>"+ book.price+"$" ;
            bookDescription.innerHTML = "<b>Description: </b>"+book.description;
            bookImage.src = book.imageLinks.thumbnail;
            console.log(book.description);
        },
        error: function(xhr, status, error) {
            console.log('Failed to retrieve book:', error);
        }
    });
}
window.addEventListener('load', renderSpecificBookDetails);
