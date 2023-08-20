const express = require('express');
const authRoute = express.Router();
const authController = require('../controllers/authController');

// auth router attaches /login, /logout, and /callback routes to the baseURL


authRoute.post('/signup', authController.signup_post);
authRoute.post('/login', authController.login_post);
authRoute.get('/status', authController.checkUserStatus);
authRoute.get('/logout', authController.logout_get);
module.exports = authRoute