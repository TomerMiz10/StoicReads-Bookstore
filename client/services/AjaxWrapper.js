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

    async getAllUsers() {
        try {
            const response = await fetch(this.baseUrl + '/user/getAllUsers', {
                method: 'GET',
                credentials: 'include'
            });

            return response.json();
        } catch (err) {
            console.log('Error fetching all users', err);
        }
    }

    async getAllOrdersOfUser(userId) {
        try {
            const response = await fetch(this.baseUrl + '/order/getAllOrdersOfUser/' + userId, {
                method: 'GET',
                credentials: 'include'
            });

            return response.json();
        } catch (err) {
            console.log('Error fetching all orders of the user', err);
        }
    }

    async getBookDetailsByObjectID(bookID) {
        try {
            const response = await fetch(this.baseUrl + '/book/objectBookId/' + bookID, {
                method: 'GET',
                credentials: 'include'
            });

            return response.json();
        } catch (err) {
            console.log('Error fetching book details with book object id', err);
        }
    }

    async getAllOrders() {
        try {
            const response = await fetch(this.baseUrl + '/order/getAllOrders', {
                method: 'GET',
                credentials: 'include'
            });

            return response.json();
        } catch (err) {
            console.log('Error fetching orders data', err);
        }
    }
}

window.AjaxWrapper = AjaxWrapper;