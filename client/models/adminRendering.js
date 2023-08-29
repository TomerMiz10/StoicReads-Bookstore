const ajaxWrapper = new AjaxWrapper();
const adminService = new AdminService();

async function renderExistingBooks() {
    try {
        const response = await ajaxWrapper.getAllBooks();

        const existingBooksTable = $('#existingBooks');

        response.forEach(book => {
            const row = `
                <tr>
                    <td>${book.bookID}</td>
                    <td><img src="${book.image}" width="100" height="150" alt="Book Cover" /></td>
                    <td>${book.title}</td>
                    <td>${book.price}</td>
                    <td>${book.quantity}</td>
                    <td>
                        <input type="number" id="newPrice_${book.bookID}" placeholder="New Price">
                        <input type="number" id="newQuantity_${book.bookID}" placeholder="New Quantity">
                        <button class="btn btn-danger" onclick="deleteBook(${book.bookID})">Delete</button>
                        <button class="btn btn-success" onclick="changePrice(${book.bookID})">Change Price</button>
                        <button class="btn btn-success" onclick="changeQuantity(${book.bookID})">Change Quantity</button>
                    </td>
                </tr>
            `;
            existingBooksTable.append(row);
        });
    } catch (error) {
        console.error('Error fetching existing books:', error);
    }
}

async function renderExistingOrders() {
    try {
        // Fetch users and populate the sidebar
        const users = await ajaxWrapper.getAllUsers();
        console.table(users);
        const usersList = $('#usersList');

        users.forEach(user => {
            const userItem = `<li data-userid="${user._id}" class="user-item">${user.userName}</li>`;
            usersList.append(userItem);
        });

        // Show orders when a user is clicked
        $('.user-item').click(async function () {
            const userId = $(this).data('userid');
            const orders = await ajaxWrapper.getAllOrdersOfUser(userId);
            console.log('All orders of the user')
            console.table(orders);
            const orderHistoryTable = $('#orderHistoryTable');

            orderHistoryTable.empty();
            const table = $('<table class="table">');
            table.append(`
                    <thead>
                        <tr>
                            <th>Book ID</th>
                            <th>Title</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                `);

            const tbody = table.find('tbody');
            orders.forEach(order => {
                tbody.append(`
                        <tr>
                            <td>${order.bookID}</td>
                            <td>${order.title}</td>
                            <td>${order.price}</td>
                        </tr>
                    `);
            });

            orderHistoryTable.append(table);
        });

        // Show orders button
        $('#showOrdersButton').click(function () {
            $('#orderHistoryTable').toggle();
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function renderBooksBySearch() {
    $('#searchButton').click(async function () {
        try {
            const searchInput = $('#searchInput').val();
            const response = await adminService.getBooksFromAPI(searchInput);
            console.log('API response:', response);

            if (response && response.items) {
                const apiBooksTable = $('#apiBooks');
                apiBooksTable.empty();

                response.items.forEach(book => {
                    const selfLink = book.selfLink;
                    const title = book.volumeInfo.title.replace(/'/g, "\\'"); // Edge case to replace single quotes.
                    const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'No Image Available';
                    const id = book.id;

                    if (book.volumeInfo.authors && Array.isArray(book.volumeInfo.authors) && book.volumeInfo.authors.length > 0) {
                        const author = book.volumeInfo.authors[0];

                        const row = `
                            <tr>
                                <td><img src="${thumbnail}" alt="Book Cover"></td>
                                <td>${title}</td>
                                <td>${author}</td>
                                <td>
                                    <input type="number" id="priceInput_${id}" placeholder="Price" min="0" max="100">
                                    <input type="number" id="quantityInput_${id}" placeholder="Quantity" min="0" max="100">
                                    <a class="btn btn-success" href="${selfLink}" target="_blank">View Details</a>
                                    <button class="btn btn-success" onclick="addBook('${title}', '${author}', '${selfLink}', '${id}')">Add Book</button>
                                </td>
                            </tr>
                        `;
                        apiBooksTable.append(row);
                    }
                });
            } else {
                console.log('Book does not exist in DB or API');
            }
        } catch (error) {
            console.error('Error fetching API books:', error);
        }
    });
}


async function addBook(title, author, bookDetails, id) {
    const priceInput = $(`#priceInput_${id}`).val();
    const quantityInput = $(`#quantityInput_${id}`).val();

    console.log('Price input:', priceInput);
    console.log('Quantity input:', quantityInput);

    if (priceInput === '' || quantityInput === '') {
        alert('Price and quantity cannot be empty');
        return;
    }

    const price = parseFloat(priceInput);
    const quantity = parseInt(quantityInput);

    if (isNaN(price) || isNaN(quantity) || price < 0 || price > 100 || quantity < 0 || quantity > 100) {
        alert('Invalid price or quantity. Price and quantity should be between 0 and 100.');
        return;
    }

    try {
        await adminService.createBook(title, author, price, quantity, bookDetails);
        alert('Book added successfully');
        window.location.reload();
    } catch (error) {
        console.log('Error adding book: ' + error.message);
    }
}


async function deleteBook(bookID) {
    try {
        await adminService.deleteBook(bookID)
        alert('Book deleted successfully');
        window.location.reload();
    } catch (err) {
        console.log('Error deleting book: ', err);
    }
}

async function changePrice(bookID) {
    const newPriceInput = $(`#newPrice_${bookID}`);
    const newPrice = newPriceInput.val();

    if (!newPrice || isNaN(newPrice) || newPrice < 1 || newPrice > 100) {
        alert("Price must be between 1 and 100.");
        return;
    }

    try {
        const response = await adminService.changeBookPrice(bookID, newPrice);
        alert('Price changed successfully');
        window.location.reload();
    } catch (error) {
        console.error('Error changing price:', error);
    }
}

async function changeQuantity(bookID) {
    const newQuantityInput = $(`#newQuantity_${bookID}`).val();

    if (!newQuantityInput || isNaN(newQuantityInput) || newQuantityInput < 1 || newQuantityInput > 100) {
        alert('Please enter a valid quantity.');
        return;
    }

    const newQuantity = parseInt(newQuantityInput);

    try {
        await adminService.updateBookQuantity(bookID, newQuantity);
        alert('Quantity updated successfully.');
        window.location.reload();
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await adminService.authAdmin();
})
$(document).ready(function () {
    renderExistingBooks();
    renderBooksBySearch();
    renderExistingOrders();
});
