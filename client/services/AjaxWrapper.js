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

    async getMapData(storeName) {
        try {
            const response = await $.ajax({
                url: this.baseUrl + '/map/getMapData/' + storeName, type: 'GET'
            });

            return response;
        } catch (error) {
            console.log('Failed to retrieve map location:', error);
        }
    }


}

window.AjaxWrapper = AjaxWrapper;