var books = [];
const baseUrl = 'http://localhost:3000';

function renderNoBooksFound() {
    const container = $('#books-list-container');
    container.empty();
    const noBooksFound = $('<div class="card mb-3">');
    const cardBody = $('<div class="card-body">');
    const titleElement = $('<h5 class="card-title">').text('No books found');
    cardBody.append(titleElement);
    noBooksFound.append(cardBody);
    container.append(noBooksFound);
}
function renderBooks() {
    const container = $('#books-list-container');
    container.empty();
    if (books.length === 0) {
        renderNoBooksFound();
        return;
    }
    const booksListHtml = books.map((book, index) => {
        return `
            <div class="card" style="width: 18rem;">
                <img src="#" class="card-img-top" alt="...">
                  <div class="card-body">
                     <h5 class="card-title">${book.title}</h5>
                     <p class="card-text">${book.description}</p>
                     <a href="order.html?id=${book.bookID}" class="btn btn-primary">Order Now</a>
                  </div>
            </div>`;
    });
    container.append(booksListHtml);
}

function getBooks() {
    $.ajax({
        url: baseUrl+'/books',
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
function getBooksByGenre(genre) {
    $.ajax({
        url:baseUrl+'/books/genre/' + genre,
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
