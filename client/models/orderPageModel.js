const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');
const baseUrl = 'http://localhost:3000';
const user = urlParams.get('user');
let book = {};
let recommendedBooks = [];

const renderSpecificBookDetails = () => {
    console.log('user: ', user);
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
                    <a href="order.html?id=${bookItem.bookID}"><div><img src=${bookItem.image} class="card-img-top" alt=""></div></a>
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
    $.ajax({
        url: baseUrl+'/book/genre/'+book.genre,
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
        const isBookInStock = response.quantity > 1;
        stockStatus.innerHTML = isBookInStock? 'In Stock' : 'Out of Stock';
        stockStatus.classList.toggle('out-of-stock',!isBookInStock);
      },
      error: function(xhr, status, error) {
        console.log('Failed to check stock of book:', error);
        stockStatus.innerHTML = 'Error checking stock';
        stockStatus.classList.add('out-of-stock');
      }
  });
};

window.addEventListener('load', () => {

    if(user === ''){
        alert('You must be logged in to order a book!');
        window.location.href = 'login.html';
    }
    else renderSpecificBookDetails();
});

