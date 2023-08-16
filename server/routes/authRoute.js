const express = require('express');
const authRoute = express.Router();
const auth0Controller = require('../controllers/authController');

// auth router attaches /login, /logout, and /callback routes to the baseURL


authRoute.post('/signup', auth0Controller.signup_post);
authRoute.post('/login', auth0Controller.login_post);

module.exports = authRoute