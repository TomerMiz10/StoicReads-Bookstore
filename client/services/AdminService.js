class AdminService {
    baseUrl = 'http://localhost:3000';


    async createBook(title) {
        try {

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


        } catch (error) {
            console.log("Failed to change the book's price:", error);
        }
    }
}

window.AdminService = AdminService;