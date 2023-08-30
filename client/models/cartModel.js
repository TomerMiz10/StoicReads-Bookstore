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
    removeButton.addEventListener('click', () => removeFromCart(book._id, userId));
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
            window.location.href = 'success.html';
        },
        error: function(error) {
            console.log('Error Clearing Cart. Please try again.', error);
        }
    });
}

function handlePurchase(userId, cartItems) {
    const orderData = {
        userID: userId,
        items: JSON.stringify(mapCartIntoItems(cartItems)),
        totalPrice: calculateTotalPrice(cartItems)
    };

    // console.log('cartModel - this is orderData: ', orderData);
    $.ajax({
        url: baseUrl + '/order/createOrder/',
        type: 'POST',
        data: orderData,
        success: function(response) {
            //console.log('Order created successfully:', response);
            alert('Order placed successfully');
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
        // console.table('Current user info: ', data);
        const userId = data.userId;
        fetchAndRenderCart(userId);
    }
    else {
        alert('Please login to view your cart')
        window.location.href = 'login.html';
    }
}