let books = [];
const baseUrl = 'http://localhost:3000';
const totalPriceDiv = document.querySelector('#total-price');
const tableBody = document.querySelector('.table tbody');

const removeFromCart = (bookId, userId) => {
    const row = $(this).closest('tr');
    $.ajax({
        url: baseUrl + '/cart/removeFromCart',
        type: 'POST',
        data: {bookId, userId},
        success: function (cart) {
            row.remove();
            alert('Book removed from cart successfully!');
            window.location.reload();
        },
        error: function (error) {
            console.error('Error removing book from cart:', error);
            alert('Error removing book from cart. Please try again.');
        }
    });
};
const mapBookToTableRow = (book, userId) => {
    const row = document.createElement('tr');
    const titleCell = document.createElement('td');
    const authorCell = document.createElement('td');
    const quantityCell = document.createElement('td');
    const priceCell = document.createElement('td');
    const actionCell = document.createElement('td');
    const removeButton = document.createElement('button');
    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    quantityCell.textContent = book.quantity;
    priceCell.textContent = `$${book.price}`;
    removeButton.textContent = "Remove";
    removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'remove-from-cart');
    removeButton.addEventListener('click', () => removeFromCart(book._id, userId));
    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    actionCell.appendChild(removeButton);
    row.appendChild(actionCell);
    return row;
}

function fetchAndRenderCart(userId) {
    $.ajax({
        url: baseUrl + '/cart/getCart/' + userId,
        type: 'GET',
        success: function (cartItems) {
            const tableBody = $('.table tbody');
            tableBody.empty();  // Clear current contents
            cartItems.forEach(item => {
                const book = item.bookId; // because we populated the book details
                book.quantity = item.quantity; // Add quantity to book object for the mapper function
                tableBody.append(mapBookToTableRow(book, userId));
            });
            totalPriceDiv.textContent = "total price: " + calculateTotalPrice(cartItems) + "$";
            document.getElementById('cart-item-count').textContent = cartItems.length;

            if(cartItems.length > 0) {
                createPurchaseButton(userId, cartItems);
            }
        },
        error: function (error) {
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
function updateCartCount(userId) {
    const cartItemCountElement = document.getElementById('cart-item-count');
    $.ajax({
        url: baseUrl + '/cart/getCart/' + userId,
        type: 'GET',
        success: function(cartItems) {
            cartItemCountElement.textContent = cartItems.length;
        },
        error: function(error){
            console.error('Error fetching cart. Please try again.', error);
        }
    });
}

function createPurchaseButton(userId, cartItems) {
    const purchaseButtonContainer = document.createElement('div');
    purchaseButtonContainer.classList.add('purchase-button-container');

    const purchaseButton = document.createElement('button');
    purchaseButton.textContent = "Purchase";
    purchaseButton.classList.add('btn', 'btn-primary', 'btn-purchase');
    purchaseButton.type = 'button';
    purchaseButton.addEventListener('click', () =>  handlePurchase(userId, cartItems));
    purchaseButtonContainer.appendChild(purchaseButton);

    document.querySelector('#total-price').after(purchaseButtonContainer);
}

function mapCartIntoItems(cartItems){
    return items = cartItems.map(item =>({
        bookId: item.bookId._id,
        quantity: item.quantity
    }));
}

async function clearCartView(userId) {
    $.ajax({
        url: baseUrl + '/cart/clearCart',
        type: 'PUT',
        data: {userId},
        success: function(response) {
            window.location.reload();
        },
        error: function(error) {
            console.log(('Error Clearing Cart. Please try again.'));
        }
    });
}

function handlePurchase(userId, cartItems) {
    const orderData = {
        userID: userId,
        items: JSON.stringify(mapCartIntoItems(cartItems)),
        totalPrice: calculateTotalPrice(cartItems)
    };

    console.log('cartModel - this is orderData: ', orderData);
    $.ajax({
        url: baseUrl + '/order/createOrder/',
        type: 'POST',
        data: orderData,
        success: function(response) {
            console.log('Order created successfully:', response);
            alert('Order placed successfully');

            updateCartCount(userId);
            clearCartView(userId);
        },
        error: function(error) {
            console.error('Error creating order:', error);
            alert('Error placing order. Please try again.');
        }
    });

}

window.onload = async () => {
    const response = await fetch(baseUrl + '/auth/status', {
        method: 'GET',
        credentials: 'include'
    });
    const data = await response.json();
    if (data.status) {
        console.table(data);
        const userId = data.userId;
        fetchAndRenderCart(userId);
        updateCartCount(userId);
    }
    else {
        alert('Please login to view your cart')
        window.location.href = 'login.html';
    }
}

