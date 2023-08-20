class AjaxWrapper {
    baseUrl = 'http://localhost:3000';

    constructor() {
        this.cache = {};
    }

    async getAllBooks() {
        try {
            const response = await $.ajax({
                url: this.baseUrl + '/book/getAllBooks', type: 'GET'
            });

            return response;
        } catch (error) {
            console.log('Failed to retrieve books:', error);
        }
    }

    async getBooksFromAPI(title) {
        try {
            const searchInput = title;

            const cachedResponse = this.cache["responses"].find(item => item.searchInput === searchInput);
            if (cachedResponse) {
                return cachedResponse["data"];
            }

            const response = await $.ajax({
                url: this.baseUrl + '/book/search/?title=' + searchInput,
                type: 'GET'
            });

            this.cache["responses"].push({searchInput, data: response});

            return response;
        } catch (error) {
            console.log('Failed to retrieve books:', error);
        }
    }
}

window.AjaxWrapper = AjaxWrapper;