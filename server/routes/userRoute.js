const express = require('express');
const userRoute = express.Router();

const {
    getUserById,
    getAllUsers,
    getCartByUserId,
    getLastOrderByUserId
} = require("../controllers/userController");

userRoute.get("/userId/:userID",getUserById);
userRoute.get("/getAllUsers", getAllUsers);
userRoute.get("/getCartByUserId/:userID", getCartByUserId);
userRoute.get("/getLastOrderByUserId/:userID", getLastOrderByUserId);

module.exports = userRoute;