const express = require("express");
const cartRoute = express.Router();
const cartController = require("../controllers/cartController");

cartRoute.post("/addToCart", cartController.addToCart);
cartRoute.get('/getCart/:userId', cartController.getOneUserCart);
cartRoute.post('/removeFromCart', cartController.removeFromCart);
cartRoute.put('/clearCart', cartController.clearCart);
module.exports = cartRoute;
