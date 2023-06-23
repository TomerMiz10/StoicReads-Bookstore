
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
const Book = require("./models/bookModel");
const {bookRoute}  = require('./routes/bookRoute');
const app = express();
const uri = "mongodb+srv://joseph1:xukjzIwQreipnuXM@cluster0.jxjyk0u.mongodb.net/?retryWrites=true&w=majority";

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 3000;

mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => {
        app.listen(port, () => console.log('Server has started on port: ' + port));
        console.log('MongoDB Connected')
    })
    .catch(err => console.log(err));


