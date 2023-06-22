// This file will serve as the entry point for my server.
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './client')));
app.get('/', (req,res)=>{
   res.sendFile(__dirname + '/client/index.html')
});
app.get('/login-page', (req,res)=>{
    res.sendFile(__dirname + '/client/login.html')
})

const port = process.env.PORT || 4000; 
app.listen(port, ()=>{
    console.log('Server is running on port:' + port);
});

