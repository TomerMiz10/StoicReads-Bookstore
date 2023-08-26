const Order = require('../models/Order');
const User = require('../models/User');

const createOrder = async (userId, cartItems) => {
    try {
        const user = await User.findById(userId);
        if(!user){
            alert('no user found! moving to login page');
            window.location.href = '../../client/views/login.html';
        }
        const order = new Order({
            userID: userId,
            items: cartItems
        });
        await order.save();
        user.cart = [];
        await order.save();

        return order;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

const deleteOrder = async (userID) => {
    return Order.findOneAndDelete({userID});
}

module.exports = {
    createOrder,
    deleteOrder
    // Add other order-related service functions here if needed
};
