const Order = require('../models/Order');
const User = require('../models/User');

const createOrder = async (orderObj) => {
    try {

        const order = new Order({
            userID: orderObj.userID,
            items: JSON.parse(orderObj.items),
            orderDate: new Date(),
            totalPrice: orderObj.totalPrice
        });

        return await order.save();
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

const deleteOrder = async (userID) => {
    return Order.findOneAndDelete({userID});
}

const getUserById = async (userId) => await User.findOne(userId);

const handlePurchase = async (userId, cartItems) => {
    try {
        const totalPrice = await calculateTotalPrice(cartItems);
        const order = await createOrder(userId, cartItems, totalPrice);
        await updateUserPastOrders(userId, cartItems);
        return order;
    } catch (error) {
        console.error('Error handling purchase:', error)
        throw error;
    }
}

const updateUserPastOrders = async (userId, cartItems) => {
    try {
        const user = await getUserById(userId);
        if (!user) {
            alert('no user found! moving to login page');
            window.location.href = '../../client/views/login.html';
        }

        // Add the current cart to pastOrders and clear the cart
        user.pastOrders.push({
            orderDate: new Date(),
            items: cartItems,
            totalPrice: calculateTotalPrice(cartItems)
        });

        user.cart = [];
        await user.save();
    } catch (error) {
        console.error('Error updating user past orders:', error);

    }
}

const calculateTotalPrice = async (cartItems) => {
    return cartItems.reduce((total, item) => {
        return total + item.bookId.price * item.quantity;
    }, 0);
}


const getAllOrders = async () => {
    try {
        const res = await Order.find({});
        return res;
    } catch (err) {
        console.log('Error fetching all orders', err);
    }
}

const getAllOrdersOfUser = async (userId) => {
    try {
        const res = await Order.find({userID: userId});
        return res;
    } catch (err) {
        console.log('Error fetching orders of user', err);
    }
}

module.exports = {
    createOrder,
    deleteOrder,
    getUserById,
    handlePurchase,
    updateUserPastOrders,
    calculateTotalPrice,
    getAllOrdersOfUser,
    getAllOrders,
};
