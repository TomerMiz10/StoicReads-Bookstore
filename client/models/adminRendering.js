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
                    <td>${book.title}</td>
                    <td>${book.price}</td>
                    <td>
                        <input type="number" id="newPrice_${book.bookID}" placeholder="New Price">
                        <button class="btn btn-danger" onclick="deleteBook(${book.bookID})">Delete</button>
                        <button class="btn btn-success" onclick="changePrice(${book.bookID})">Change Price</button>
                    </td>
                </tr>
            `;
            existingBooksTable.append(row);
        });
    } catch (error) {
        console.error('Error fetching existing books:', error);
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
                    const title = book.volumeInfo.title;
                    const author = book.volumeInfo.authors[0];
                    const thumbnail = book.volumeInfo.imageLinks.thumbnail;

                    const row = `
                        <tr>
                            <td>${title}</td>
                            <td><img src="${thumbnail}" alt="Book Cover"></td>
                            <td>${author}</td>
                            <td>
                                <a class="btn btn-success" href="${selfLink}" target="_blank">View Details</a>
                                <button class="btn btn-success" onclick="addBook('${title}', '${author}')">Add Book</button>
                            </td>
                        </tr>
                    `;
                    apiBooksTable.append(row);
                });
            } else {
                console.log('Book does not exist in DB or API');
            }
        } catch (error) {
            console.error('Error fetching API books:', error);
        }
    });
}


async function addBook(title, author) {
    try {
        const response = await adminService.createBook(title, author);
        console.log('Book added successfully:', response);
    } catch (error) {
        console.error('Error adding book: ', error);
    }
}

async function deleteBook(bookID) {
    try {
        await adminService.deleteBook(bookID)
        window.location.reload();
    } catch (err) {
        console.log('Error deleting book: ', err);
    }
}

async function changePrice(bookID) {
    const newPriceInput = $(`#newPrice_${bookID}`);
    const newPrice = newPriceInput.val();

    if (newPrice < 1 || newPrice > 100) {
        alert("Price must be between 1 and 100.");
        return;
    }

    try {
        const response = await adminService.changeBookPrice(bookID, newPrice);
        console.log('Price changed successfully:', response);
        // window.location.reload();
    } catch (error) {
        console.error('Error changing price:', error);
    }
}




$(document).ready(function(){
    renderExistingBooks();
    renderBooksBySearch();
});
