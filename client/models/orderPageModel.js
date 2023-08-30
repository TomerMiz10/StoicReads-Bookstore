const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');
const book_id = urlParams.get('_id');
const baseUrl = 'http://localhost:3000';
const userId = urlParams.get('userId');
const welcomeMessage = $('#welcome-message');
let book = {};
let recommendedBooks = [];


const renderSpecificBookDetails = () => {
    const bookTitle = document.getElementById('bookTitle');
    const bookAuthor = document.getElementById('bookAuthor');
    const bookGenre = document.getElementById('bookGenre');
    const bookPrice = document.getElementById('bookPrice');
    const bookDescription = document.getElementById('bookDescription');
    const bookImage = document.getElementById('bookImage');
    const welcomeMessage = document.getElementById('welcomeMessage');
    $.ajax({
        url: baseUrl+'/book/bookId/' + bookId,
        type: 'GET',
        success: function(response) {
            book = response;
            bookTitle.innerHTML = book.title;
            bookAuthor.innerHTML = "<b>By: </b>"+book.author;
            bookGenre.innerHTML ="<b>Genre: </b>"+ book.genre;
            bookPrice.innerHTML ="<b>Price: </b>"+ book.price+"$" ;
            bookDescription.innerHTML = "<b>Description: </b>"+book.description;
            bookImage.src = book.image;
            updateStockStatus();
            getRecommendedBooks();
        },
        error: function(xhr, status, error) {
            console.log('Failed to retrieve book:', error);
        }
    });
}
const renderRecommendedBooks = () => {
    const relatedProductsContainer = document.getElementById('related-products-container');
    relatedProductsContainer.innerHTML = '';
    const productsHtml = recommendedBooks.map((bookItem,index) => {
        return (index < 4 && bookItem.bookID!==book.bookID)?
            (`<div class="col mb-5">
                <div class="card h-100">
                    <a href="order.html?id=${bookItem.bookID}&userId=${userId}&_id=${bookItem._id}"><div><img src=${bookItem.image} class="card-img-top" alt=""></div></a>
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="fw-bolder">${bookItem.title}</h5>                            
                        </div>
                    </div>                   
                </div>
            </div>`):``
    })
    relatedProductsContainer.innerHTML = productsHtml.join('');

};
const getRecommendedBooks = () => {
    let genre = book.genre;
    if(genre.includes('/')) {
        genre = genre.split('/')[1].trim();
    }
    $.ajax({
        url: baseUrl+'/book/genre/'+genre,
        type: 'GET',
        success: function(response) {
            recommendedBooks = response;
            renderRecommendedBooks();
        },
        error: function(xhr, status, error) {
            console.log('Failed to retrieve books:', error);
        }
    });
}
const updateStockStatus = () => {
  const stockStatus = document.getElementById('stock-status');

  $.ajax({
      url: baseUrl + '/book/bookId/' + bookId,
      type: 'GET',
      success: function(response) {
        const isBookInStock = response.quantity > 0;
        stockStatus.innerHTML = isBookInStock? 'In Stock' : 'Out of Stock';
        isBookInStock ? stockStatus.style.color = 'green' : stockStatus.style.color = 'red';
      },
      error: function(xhr, status, error) {
        console.log('Failed to check stock of book:', error);
        stockStatus.innerHTML = 'Error checking stock';
        stockStatus.classList.add('out-of-stock');
      }
  });
};

const addToCart = () => {
    if(userId === ''){
        alert('You must be logged in to order a book!');
        window.location.href = 'login.html';
    }
    $.ajax({
        url: baseUrl + '/cart/addToCart',
        type: 'POST',
        data: {book_id, userId},
        success: function (response) {
            alert('Book added to cart successfully!');
            window.location.reload();
        },
        error: function (error) {
            const errorMessage = error.response.JSON.message;
            errorMessage.includes('out of stock') ? alert('Book is out of stock') : alert('Error adding book to cart. Please try again.');
        }
    });
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


window.addEventListener('load', renderSpecificBookDetails);



