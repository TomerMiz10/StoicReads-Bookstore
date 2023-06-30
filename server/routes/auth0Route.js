const express = require('express');
const auth0Route = express.Router();

// auth router attaches /login, /logout, and /callback routes to the baseURL
auth0Route.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

module.exports = auth0Route