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
                        <button class="btn btn-danger" onclick="adminService.deleteBook(${book.bookID})">Delete</button>
                        <button class="btn btn-success" onclick="adminService.changeBookPrice(${book.bookID})">Change Price</button>
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
    $('#searchForm').submit(async function (event) {
        event.preventDefault();

        try {
            const searchInput = $('#searchInput').val();
            const response = await adminService.getBooksFromAPI(searchInput);

            const apiBooksTable = $('#apiBooks');
            apiBooksTable.empty();

            response.forEach(book => {
                const author = book.volumeInfo.authors[0];
                const row = `
                    <tr>
                        <td>${book.volumeInfo.title}</td>
                        <td><img src="${book.volumeInfo.imageLinks.thumbnail}" alt="Book Cover"></td>
                        <td>${author}</td>
                        <td>
                            <button class="btn btn-success" onclick="addBook('${book.volumeInfo.title}', '${author}')">Add Book</button>
                        </td>
                    </tr>
                `;
                apiBooksTable.append(row);
            });
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
        console.error('Error adding book:', error);
    }
}



$(document).ready(renderExistingBooks, renderBooksBySearch);
