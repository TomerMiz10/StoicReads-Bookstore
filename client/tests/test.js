const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const uri = "mongodb+srv://joseph1:xukjzIwQreipnuXM@cluster0.jxjyk0u.mongodb.net/project?retryWrites=true&w=majority";
const testBookModel = require('../tests/testBookModel.js');
const router = express.Router();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 3000;

mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => {
        app.listen(port, () => console.log('Server has started on port: ' + port));
        console.log('MongoDB Connected');
    })
    .catch(err => console.log(err));

var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected', function() {
    console.log('database is disconnected successfully');
});
conn.on('error', console.error.bind(console, 'connection error:'));

app.get('/books', async function(req, res, next) {
    try {
        const docs = await testBookModel.find().exec();
        res.status(200).json(docs);
    } catch (err) {
        console.log('Failed to retrieve the Course List: ' + err);
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});
