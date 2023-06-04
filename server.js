// This file will serve as the entry point for my server.
const express = require('express');
const app = express();

//Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({extended: false})); // Parse URL-encoded requests
// Set up additional middleware as needed, such as handling CORS or serving static files

// Routes
app.get('/', (req,res)=>{
    res.send("Setting up Server using Express.js");
});

// Server
const port = process.env.PORT || 4000; 
app.listen(port, ()=>{
    console.log('Server is running on port:' + port);
});

