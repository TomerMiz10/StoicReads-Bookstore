class AdminService {
    baseUrl = 'http://localhost:3000';

    constructor() {
        this.cache = {
            responses: []
        };
    }

    async getBooksFromAPI(title) {
        try {
            const searchInput = title;

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

    async authAdmin() {
        try {
            const response = await fetch(this.baseUrl + '/auth/status', {
                method: 'GET',
                credentials: 'include'
            });

            const data = await response.json();

            if (!data.status || !data.user.isAdmin) {
                window.location = '../views/404page.html';
            }
        } catch (err) {
            console.log('Auth err', err);
        }
    }
}

window.AdminService = AdminService;