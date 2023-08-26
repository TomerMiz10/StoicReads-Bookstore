const Order = require('../models/Order');
const User = require('../models/User');
const orderService = require('../services/orderService');
const cartController = require('../controllers/cartController');

const createOrder = async (req, res) => {
    try{
        const userId = req.userID;
        const user = await User.findById(userId);
        const cartItems = cartController.getOneUserCart();
        await orderService.createOrder(userId, cartItems);

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        const order = new Order({
            userId: userId,
            items: cartItems
        });

        await order.save();
        user.cart = [];
        await user.save();

        res.status(200).json({message: 'Order created successfully', order});
    } catch(error){
        console.error('Error creating order', error);
        res.status(500).json({message: 'Error creating order', error});
    }
};

const deleteOrder = async (req, res) => {
    try{
        const userId = req.userID;
        await orderService.deleteOrder(userId);
        res.status(200).json({message: 'Successfully deleted order'});
    }catch (error){
        console.error('error deleting order', error);
        res.status(500).json({message: 'Internal Server Error, deleting order failed'});
    }
}

module.exports ={
    createOrder,
    deleteOrder
};