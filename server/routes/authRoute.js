const express = require('express');
const authRoute = express.Router();
const authController = require('../controllers/authController');

// auth router attaches /login, /logout, and /callback routes to the baseURL


authRoute.post('/signup', authController.signup_post);
authRoute.post('/login', authController.login_post);

module.exports = authRoute