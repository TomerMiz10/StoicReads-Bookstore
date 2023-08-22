let books = [];
const baseUrl = 'http://localhost:3000';
const totalPriceDiv = document.querySelector('#total-price');
const tableBody = document.querySelector('.table tbody');

const removeFromCart = ( bookId,userId) => {
    const row = $(this).closest('tr');
    $.ajax({
        url: baseUrl + '/cart/removeFromCart',
        type: 'POST',
        data: { bookId, userId },
        success: function(cart) {
            row.remove();
            alert('Book removed from cart successfully!');
            window.location.reload();
        },
        error: function(error) {
            console.error('Error removing book from cart:', error);
            alert('Error removing book from cart. Please try again.');
        }
    });
};
const mapBookToTableRow = (book,userId)=> {
    const row = document.createElement('tr');

    // Title
    const titleCell = document.createElement('td');
    titleCell.textContent = book.title;
    row.appendChild(titleCell);

    // Author
    const authorCell = document.createElement('td');
    authorCell.textContent = book.author;
    row.appendChild(authorCell);

    // Quantity - Assuming you pass the quantity within the book object for cart purposes
    const quantityCell = document.createElement('td');
    quantityCell.textContent = book.quantity;
    row.appendChild(quantityCell);

    // Price
    const priceCell = document.createElement('td');
    priceCell.textContent = `$${book.price}`;
    row.appendChild(priceCell);

    // Action (Remove Button)
    const actionCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'remove-from-cart');
    removeButton.addEventListener('click', () => removeFromCart(book._id,userId));
    actionCell.appendChild(removeButton);
    row.appendChild(actionCell);

    return row;
}
function fetchAndRenderCart(userId) {
    $.ajax({
        url: baseUrl + '/cart/getCart/' + userId,
        type: 'GET',
        success: function(cartItems) {
            const tableBody = $('.table tbody');
            tableBody.empty();  // Clear current contents
            cartItems.forEach(item => {
                const book = item.bookId; // because we populated the book details
                book.quantity = item.quantity; // Add quantity to book object for the mapper function
                tableBody.append(mapBookToTableRow(book,userId));
            });
            totalPriceDiv.textContent = "total price: " + calculateTotalPrice(cartItems) + "$";
        },
        error: function(error) {
            console.error('Error fetching cart:', error);
            alert('Error fetching cart. Please try again.');
        }
    });
}
function calculateTotalPrice(cartItems) {
    return cartItems.reduce((total, item) => {
        return total + item.bookId.price * item.quantity;
    }, 0);
}
window.onload = async () => {
    const response = await fetch(baseUrl + '/auth/status', {
        method: 'GET',
        credentials: 'include'
    });
    const data = await response.json();
    if (data.status) {
        fetchAndRenderCart(data.userId);
    }
    else {
        alert('Please login to view your cart')
        window.location.href = 'login.html';
    }
}


