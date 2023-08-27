const express = require('express');
const userRoute = express.Router();

const {
    getUserByID,
    getAllUsers,
    getCartByUserId,
    getLastOrderByUserId
} = require("../controllers/userController");

userRoute.get("/userId/:userID",getUserByID);
userRoute.get("/getAllUsers", getAllUsers);
userRoute.get("/getCartByUserId/:userID", getCartByUserId);
userRoute.get("/getLastOrderByUserId/:userID", getLastOrderByUserId);

module.exports = userRoute;