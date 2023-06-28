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
    const booksListHtmlAsCards = books.map((bookItem, index) => {
        return `
            <div class="card m-4 " style="width: 12rem;">
                <a href="order.html?id=${bookItem.bookID}"><div><img src=${bookItem.image} class="card-img-top" alt=""></div></a>
                  <div class="card-body">
                     <h5 class="card-title">${bookItem.title}</h5>
                     <p class="card-text"> ${bookItem.author}</p>  
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
const getBooksBySearch = () => {
    const searchInput = $('#search-input').val();
    const searchBy = $('#search-by').val();
    let URL = '';
    if(searchBy === 'title')
        URL = baseUrl+'/book/search/?title='+searchInput;
    else if(searchBy === 'author')
        URL = baseUrl+'/book/search/?author='+searchInput;
    else {
        alert('Please select a search option');
        return;
    }
    console.log('URL:', URL);
    $.ajax({
        url: URL,
        type: 'GET',
        success: function(response) {
            books = response;
            renderBooks();
        },
        error: function(xhr, status, error) {
            console.log('Failed to retrieve books:', error);
            renderNoBooksFound();
        }
    });
}

$(document).ready(getBooks);
