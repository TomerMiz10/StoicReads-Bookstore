
const orderService = require('../services/orderService');
const cartController = require('../controllers/cartController');

const  getOrdersByUserId=async (req,res)=> {

}
const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);

        res.status(200).json({message: 'Order created successfully', order});
    } catch (error) {
        console.error('Error creating order', error);
        res.status(500).json({message: 'Error creating order', error});
    }
};

const deleteOrder = async (req, res) => {
    try {
        const userId = req.userID;
        await orderService.deleteOrder(userId);
        res.status(200).json({message: 'Successfully deleted order'});
    } catch (error) {
        console.error('error deleting order', error);
        res.status(500).json({message: 'Internal Server Error, deleting order failed'});
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.query.userId;
        const user = await orderService.getUserById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json({message: 'successfully retrieved user'});
    } catch (error) {
        console.error('error getting user', error);
        res.status(500).json({message: 'Internal Server Error, getting user failed'});

    }
}

const handlePurchase = async (req, res) => {
    try {
        const userId = req.userId;
        const cartItems = await cartController.getOneUserCart();

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({message: 'Cart is empty.'});
        }

        const totalPrice = orderService.calculateTotalPrice(cartItems);
        const order = await orderService.createOrder(userId, cartItems, totalPrice);

        await orderService.updateUserPastOrders(userId, cartItems);

        res.status(200).json({message: 'Order updated successfully', order: order});
    } catch (error) {
        console.error('error making purchase request', error);
        res.status(500).json({message: 'Internal Server Error', error})
    }
}


const getAllOrdersOfUser = async (req, res) => {
    try {
        const userID = req.params.userId;
        console.log("User id is: ", userID);
        const ordersOfUser = await orderService.getAllOrdersOfUser(userID);
        console.log('orders of the user are: ', ordersOfUser);
        res.status(200).json({ordersOfUser});
    } catch (error) {
        console.error('Error fetching the orders', error);
        res.status(500).json({message: 'Internal Server Error', error})
    }
}


module.exports = {
    createOrder,
    deleteOrder,
    getUserById,
    handlePurchase,
    getOrdersByUserId
};