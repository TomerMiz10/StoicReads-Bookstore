const Order = require('../models/Order');
const User = require('../models/User');
const orderService = require('../services/orderService');
const cartController = require('../controllers/cartController');

const createOrder = async (req, res) => {
    try{
        console.log('orderController: hi');
        const jsonObject = req.body;

        console.log(req.body);

       const order = await orderService.createOrder(req.body);

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

const getUserById = async (req, res) => {
    try{
        const userId = req.query.userId;
        const user = await orderService.getUserById(userId);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        // await orderService.getUserById;
        res.status(200).json({message: 'successfully retrieved user'});
        //return res.status(200).json({user});
    }catch (error){
        console.error('error getting user', error);
        res.status(500).json({message: 'Internal Server Error, getting user failed'});

    }
}

const handlePurchase = async (req, res) => {
    try{
        const userId = req.userID;
        const cartItems = cartController.getOneUserCart();

        if(!cartItems || cartItems.length === 0){
            return res.status(400).json({message: 'Cart is empty.'});
        }

        const totalPrice = orderService.calculateTotalPrice(cartItems);
        const order = await orderService.createOrder(userId, cartItems, totalPrice);

        await orderService.updateUserPastOrders(userId, cartItems);

        res.status(200).json({message: 'Order updated successfully', order: order});
    }catch (error){
        console.error('error making purchase request', error);
        res.status(500).json({message: 'Internal Server Error', error})
    }
}


module.exports ={
    createOrder,
    deleteOrder,
    getUserById,
    handlePurchase
};