class AdminService {
    baseUrl = 'http://localhost:3000';

    constructor() {
        this.cache = {
            responses: []
        };
    }

    async doesExistInDB(searchInput) {
        try {
            const response = await $.ajax({
                url: this.baseUrl + '/book/search/?title=' + searchInput,
                type: 'GET'
            });

            return true;
        } catch (err) {
            if (err.status === 404) {
                return false;
            } else {
                console.error('Error checking if book exists in DB:', err);
                return true; // Return true for other status codes to avoid throwing an error
            }
        }
    }


    async getBooksFromAPI(title) {
        try {
            const searchInput = title;

            if (await this.doesExistInDB(searchInput)) return;

            const cachedResponse = this.cache["responses"].find(item => item.searchInput === searchInput);
            if (cachedResponse) {
                return cachedResponse["data"];
            }

            const response = await $.ajax({
                url: this.baseUrl + '/book/getGoogleBooksDetails/' + searchInput,
                type: 'GET'
            });

            this.cache["responses"].push({searchInput, data: response});

            return response;
        } catch (error) {
            console.log('Failed to retrieve books:', error);
        }
    }

    async createBook(title, author, price, quantity, bookDetails) {
        try {
            const response = await $.ajax({
                url: `${this.baseUrl}/admin/createBooks`,
                type: 'POST',
                data: {title, author, price, quantity, bookDetails},
            });

            return response;

        } catch (error) {
            console.log('Failed to create Book:', error);
        }
    }

    async deleteBook(bookID) {
        try {
            const response = await $.ajax({
                url: `${this.baseUrl}/admin/deleteBook/${bookID}`,
                type: 'DELETE'
            });

            return response;
        } catch (error) {
            console.log('Failed to delete book:', error);
        }
    }


    async changeBookPrice(bookID, price) {
        try {

            console.log(`${bookID} + ${price}`)
            const response = await $.ajax({
                url: `${this.baseUrl}/admin/changeBookPrice`,
                type: 'PUT',
                data: {bookID, price}
            });

            return response;
        } catch (error) {
            console.log("Failed to change the book's price:", error);
        }
    }

    async updateBookQuantity(bookID, quantity) {
        try {
            console.log(`${bookID} + ${quantity}`)
            const response = await $.ajax({
                url: `${this.baseUrl}/admin/changeBookQuantity`,
                type: 'PUT',
                data: {bookID, quantity}
            });

            return response;
        } catch (error) {
            console.log("Failed to change the book's price:", error);
        }
    }
}

window.AdminService = AdminService;