const ajaxWrapper = new AjaxWrapper();

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
    $('#searchForm').submit(async function (event) {
        event.preventDefault();

        try {
            const searchInput = $('#searchInput').val();
            const response = await ajaxWrapper.getBooksFromAPI(searchInput);

            const apiBooksTable = $('#apiBooks');
            apiBooksTable.empty();

            response.forEach(book => {
                const row = `
                    <tr>
                        <td>${book.title}</td>
                        <td>${book.image}</td>
                        <td>
                        <button class="btn btn-success" onclick="changePrice(${book.bookID})">Add Book</button>
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

$(document).ready(renderExistingBooks, renderBooksBySearch);
