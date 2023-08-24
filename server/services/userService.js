const User = require("../models/User"); // Make sure to use the correct path to your User model

const getAllUsers = async () => await User.find({});
const getUserById = async (userId) => await User.findById(userId);

module.exports = {
    getUserById,
    getAllUsers
};
