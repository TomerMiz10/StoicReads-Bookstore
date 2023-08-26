const express = require('express');
const orderRoute = express.Router();
const orderController = require("../controllers/orderController");

orderRoute.post("/createOrder", orderController.createOrder);
orderRoute.post("/deleteOrder", orderController.deleteOrder);

// Add other order-related routes here if needed

module.exports = orderRoute;