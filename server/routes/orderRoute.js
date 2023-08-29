const express = require('express');
const orderRoute = express.Router();
const orderController = require("../controllers/orderController");

orderRoute.post("/createOrder", orderController.createOrder);
orderRoute.post("/deleteOrder/:userId", orderController.deleteOrder);
orderRoute.get("/getUserById/:userId", orderController.getUserById);
orderRoute.get("/handlePurchase/", orderController.handlePurchase);
orderRoute.get("/getAllOrdersOfUser/:userId", orderController.handlePurchase);

module.exports = orderRoute;