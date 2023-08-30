let books = [];
let userId = '';
const baseUrl = 'http://localhost:3000';
const welcomeMessage = $('#welcome-message');

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
                <a href="order.html?id=${bookItem.bookID}&userId=${userId}&_id=${bookItem._id}"><div><img src=${bookItem.image} class="card-img-top" alt=""></div></a>
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

const getBooks = ()=> {
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
    const setWelcomeMessage = async () => {
        const response = await fetch(baseUrl + '/auth/status', {
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();
        if(data.status){
            userId = data.userId;
            welcomeMessage.text('Welcome back '+data.user.userName+ '! browse books from our collection');
        }
        else{
            welcomeMessage.text('Welcome to Stoic Reads book store! browse books from our collections! sign up or login to make a purchase');
        }
          updateCartCount(data.userId);
    };
const logOut = () => {
    if(welcomeMessage.text().includes('Welcome to Stoic Reads book store! browse books from our collections! sign up or login to make a purchase')){
        alert('You are not logged in!');
        return;
    }
        $.ajax({
            url: baseUrl + '/auth/logout',
            type: 'GET',
            xhrFields: {
                withCredentials: true
            },
            success: function(response) {
                console.log(response.status);
                alert('Logged out successfully!');
                window.location.href = '../views/login.html';
            },
            error: function(error) {
                console.error('Error during logout:', error);
            }
        });

};


$(document).ready(setWelcomeMessage);
$(document).ready(getBooks);



