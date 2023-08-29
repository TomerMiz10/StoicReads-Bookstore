const User = require("../models/User");

const getAllUsers = async () => await User.find({});
const getUserById = async (userId) => await User.findById(userId);

const getCartByUserId = async (userId) => {
    const user = await User.findById(userId);
    if (!user){
        throw new Error("User not found");
    }
    return user.cart;
};

const getLastOrderByUserId = async (userId) =>{
    const user = await User.findById(userId);
    if (!user){
        throw new Error("User not found");
    }
    return user.pastOrders.length > 0 ? user.pastOrders[user.pastOrders.length - 1] : null;
}

module.exports = {
    getUserById,
    getAllUsers,
    getCartByUserId,
    getLastOrderByUserId
};
