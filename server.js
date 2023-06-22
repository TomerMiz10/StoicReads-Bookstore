// This file will serve as the entry point for my server.
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const bookRoute = require('./routes/bookRoute');
const app = express();
const uri = "mongodb+srv://mssplinter10:masterBookstore12@cluster0.lcmwfcu.mongodb.net/?retryWrites=true&w=majority";

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './client')));
app.use('/routes/bookRoute', bookRoute);
app.get('/', (req,res)=>{
   res.sendFile(__dirname + '/client/index.html')
});
app.get('/login-page', (req,res)=>{
    res.sendFile(__dirname + '/client/login.html')
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


