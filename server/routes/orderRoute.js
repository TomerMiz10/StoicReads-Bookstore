const express = require('express');
const orderRoute = express.Router();


const {
    createOrder,
    deleteOrder
} = require("../controllers/orderController");

orderRoute.post("/createOrder", createOrder);
orderRoute.post("/deleteOrder", deleteOrder);

module.exports = orderRoute;