class OrderService{
    baseUrl = 'http://localhost:3000';

    constructor() {
        this.cache = {
            response: []
        };
    }

    async createOrder(userId, itemsInCart){
        try{
            return await $.ajax({
                url: `${this.baseUrl}/order/createOrder/`${userId, itemsInCart},
                type: 'POST',
                data: {userId, itemsInCart},
            });
        } catch(error){
            console.log('Failed to create order:', error);
        }
    }

    async deleteOrder(userId){
        try{
            return await $.ajax({
                url: `${this.baseUrl}/order/deleteOrder/${userId}`,
                type: 'DELETE'
            });
        }catch (error){
            console.log('Failed to delete order:', error);
        }
    }

    async getUserById(userId){
        try{
            return await $.ajax({
                url: `${this.baseUrl}/order/getUserById/${userId}`,
                type: 'GET'
            });
        } catch(error){
            console.log('Failed to get user', error);
        }
    }
}
window.OrderService = OrderService;