var books = [];
const baseUrl = 'http://localhost:3000';

function renderNoBooksFound() {
    var container = $('#books-list-container');
    container.empty();
    var noBooksFound = $('<div class="card mb-3">');
    var cardBody = $('<div class="card-body">');
    var titleElement = $('<h5 class="card-title">').text('No books found');
    cardBody.append(titleElement);
    noBooksFound.append(cardBody);
    container.append(noBooksFound);
}
function renderBooks() {
    var container = $('#books-list-container');
    container.empty();
    books.forEach(function (book) {
        var bookElement = $('<div class="card mb-3">');
        var cardBody = $('<div class="card-body">');
        var titleElement = $('<h5 class="card-title">').text(book.title);
        var authorElement = $('<p class="card-text">').text('Author: ' + book.author);
        var descriptionElement = $('<p class="card-text">').text('Description: ' + book.description);
        var genreElement = $('<p class="card-text">').text('Genre: ' + book.genre);
        var yearElement = $('<p class="card-text">').text('Year of Publishment: ' + book.yearOfPublishment);
        var priceElement = $('<p class="card-text">').text('Price: ' + book.price);
        var quantityElement = $('<p class="card-text">').text('Quantity: ' + book.quantity);
        cardBody.append(titleElement, authorElement, descriptionElement, genreElement, yearElement, priceElement, quantityElement);
        bookElement.append(cardBody);
        container.append(bookElement);
    });
}
function getBooks() {
    $.ajax({
        url: baseUrl+'/books',
        type: 'GET',
        success: function(response) {
            books = response; // Assuming the response is an array of book objects
            renderBooks();
        },
        error: function(xhr, status, error) {
            console.log('Failed to retrieve books:', error);
        }
    });
}
function getBooksByGenre(genre) {
    $.ajax({
        url:baseUrl+'/books/' + genre,
        type: 'GET',
        success: function(response) {
            books = response;
            renderBooks();
        },
        error: function(xhr, status, error) {
            console.log('Failed to retrieve books:', error);
        }
    });
}
$(document).ready(function() {
    getBooks();
});
