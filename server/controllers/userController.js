const userService = require("../services/userService");

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userService.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found", success: false });
        }

        console.log('Successfully retrieved a user by their ID');
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        console.log('Successfully retrieved all users');
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error, couldn't fetch users", success: false });
    }
};

const getCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await userService.getCartByUserId(userId);

        if (cart.length === 0) {
            return res.status(200).json({ message: "User's cart is empty", success: true });
        }

        console.log('Successfully retrieved user\'s cart');
        res.status(200).json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};

const getLastOrderByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const lastOrder = await userService.getLastOrderByUserId(userId);

        if (!lastOrder) {
            return res.status(200).json({ message: "No orders found for the user", success: true });
        }

        console.log('Successfully retrieved user\'s last order');
        res.status(200).json(lastOrder);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};

module.exports = {
    getUserById,
    getAllUsers,
    getCartByUserId,
    getLastOrderByUserId
};