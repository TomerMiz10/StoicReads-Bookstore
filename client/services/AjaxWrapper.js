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

    async getAuthData() {
        try {
            const response = await fetch(this.baseUrl + '/auth/status', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            return data;
        } catch (err) {
            console.log('Error fetching auth data', err);
        }
    }
}


window.AjaxWrapper = AjaxWrapper;