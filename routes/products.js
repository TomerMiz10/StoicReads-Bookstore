// Handling product-realted routes
const express = require('express');
const router = express.Router();

// Get /products - Retrieve all products
router.get('/', productController.getAllProducts);

// Post /products - Create a new product
router.post('/', productController.createProduct);
// Here, productController.getAllProducts and productController.createProduct are placeholders for the actual controller methods that will handle these requests.
// We'll cover controller implementation later.




module.exports = router;