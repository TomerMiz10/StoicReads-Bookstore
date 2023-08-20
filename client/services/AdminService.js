class AdminService {
    baseUrl = 'http://localhost:3000';

    constructor() {
        this.cache = {};
    }

    async doesExistInDB(searchInput) {
        const response = await $.ajax({
            url: this.baseUrl + '/book/search/?title=' + searchInput,
            type: 'GET'
        });

        return response.title === searchInput;
    }

    async getBooksFromAPI(title) {
        try {
            const searchInput = title;

            if (this.doesExistInDB) return;

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

    async createBook(title, author) {
        try {
            const data = {
                title: title,
                author: author
            };

            const response = await $.ajax({
                url: `${this.baseUrl}/admin/createBook`,
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json'
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


    async changeBookPrice(bookID) {
        try {
            const response = await $.ajax({
                url: `${this.baseUrl}/admin/changeBookPrice/${bookID}`,
                type: 'GET'
            });

            return response;
        } catch (error) {
            console.log("Failed to change the book's price:", error);
        }
    }
}

window.AdminService = AdminService;