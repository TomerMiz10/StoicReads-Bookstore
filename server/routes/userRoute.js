const express = require('express');
const userRoute = express.Router();

const {
    getUserByID,
    getAllUsers
} = require("../controllers/userController");

userRoute.get("/userId/:userID",getUserByID);
userRoute.get("/getAllUsers", getAllUsers);

module.exports = userRoute;