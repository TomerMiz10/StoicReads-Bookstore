var books = [];
const baseUrl = 'http://localhost:3000';
const renderNoBooksFound= ()=> {
    const booksListContainer = $('#books-list-container');
    booksListContainer.empty();
    const noBooksFound = $('<div class="card mb-3">');
    const cardBody = $('<div class="card-body">');
    const titleElement = $('<h5 class="card-title">').text('No books found');
    cardBody.append(titleElement);
    noBooksFound.append(cardBody);
    booksListContainer.append(noBooksFound);
}
const renderBooks= ()=> {
    const booksListContainer = $('#books-list-container');
    booksListContainer.empty();
    if (books.length === 0) {
        renderNoBooksFound();
        return;
    }
    const booksListHtmlAsCards = books.map((book, index) => {
        return `
            <div class="card m-2 " style="width: 18rem;">
                <img src=${book.imageLinks.thumbnail} class="card-img" alt="">
                  <div class="card-body">
                     <h5 class="card-title">${book.title}</h5>
                     <p class="card-text">By: ${book.author}</p>
                     <p class="card-text">${book.description}</p>   
                    <a href="order.html?id=${book.bookID}" class="btn btn-primary">Order Now</a>
                  </div>
            </div>`;
    }).join('');
    const classesToMakeCardsAlign = 'd-flex flex-wrap justify-content-center';
    booksListContainer.addClass(classesToMakeCardsAlign);
    booksListContainer.append(booksListHtmlAsCards);
}

const getBooks= ()=> {
    $.ajax({
        url: baseUrl+'/book/getAllBooks',
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

const getBooksByGenre =  (genre) => {
    $.ajax({
        url: baseUrl+'/book/genre/'+genre,
        type: 'GET',
        success: function(response) {
            books = response;
            renderBooks();
        },
        error: function(xhr, status, error) {
            console.log('Failed to retrieve books:', error);
        }
    });
};
$(document).ready(function() {
    getBooks();
});
