const express = require('express');
const userRoute = express.Router();

const {
    getUserByID
} = require("../controllers/userController");

userRoute.get("user/userId/:userID",getUserByID);

module.exports = userRoute;