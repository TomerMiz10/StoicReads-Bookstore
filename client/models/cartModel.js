let books = [];
const baseUrl = 'http://localhost:3000';
const totalPriceDiv = document.querySelector('#total-price');
const tableBody = document.querySelector('.table tbody');

console.log(baseUrl + 'here in cartModel.js');

const mapBookToTableRow = (book)=> {
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
    removeButton.addEventListener('click', function() {
        // Logic to remove the book from the cart goes here
        // Example: send an AJAX request to the server to remove the book from the user's cart
        // Then, remove this row from the table in the UI
    });
    actionCell.appendChild(removeButton);
    row.appendChild(actionCell);

    return row;
}
const calculateTotalPrice = () => {
    let totalPrice = 0;
    booksInCart.forEach(book => {
        totalPrice += book.price * book.quantity;
    });
    totalPriceDiv.textContent = `total price: ${totalPrice}$`;
};



// Usage example
const book = {
    title: "Example Book Title",
    author: "John Doe",
    quantity: 2,
    price: 50
};



// Example books fetched from the server
const booksInCart = [
    { title: "Example Book 1", author: "Author 1", quantity: 2, price: 50 },
    { title: "Example Book 2", author: "Author 2", quantity: 1, price: 30 }
];

booksInCart.forEach(book => {
    tableBody.appendChild(mapBookToTableRow(book));
    calculateTotalPrice();
});

