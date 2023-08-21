class AjaxWrapper {
    baseUrl = 'http://localhost:3000';

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


}

window.AjaxWrapper = AjaxWrapper;