// contains methods to handle product-related operations

// Import any necessary modules or models
const Product = require('../models/Product');

// GET /products - Retrieve all products
const getAllProducts = (req, res) => {
    // Logic to retrieve all products from the database
    // Fetch all products from the database
    Product.find()
      .then((products) => {
        res.json(products);
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred while fetching products' });
      });
  };
  
  // POST /products - Create a new product
  const createProduct = (req, res) => {
    // Extract product data from the request body
    // Logic to create a new product based on the request data
    const { name, price, description } = req.body;
  
    // Create a new product object
    const newProduct = new Product({ name, price, description });
  
    // Save the new product to the database
    newProduct
      .save()
      .then((product) => {
        res.status(201).json(product);
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred while creating the product' });
      });
  };

// Other controller methods...


  
  module.exports = {
    getAllProducts,
    createProduct,
      // Export other methods as needed
  };
  
