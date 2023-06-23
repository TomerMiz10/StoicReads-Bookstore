const baseUrl = 'http://localhost:3000';
let books = [];
const container = $('#books-list-container');
function getBooks() {
    $.ajax({
        url: 'http://localhost:3000/books',
        type: 'GET',
        success: function(response) {
            $('h1').text('All Books');
            books = response; // Assuming the response is an array of book objects
            container.empty();
            books.forEach(function(book) {
                var bookElement = $('<div class="flex-center ">');
                bookElement.text(book.title);
                container.append(bookElement);
            });
        },
        error: function(xhr, status, error) {
            console.log('Failed to retrieve books:', error);
        }
    });
}
$('#all-books').click(getBooks);
