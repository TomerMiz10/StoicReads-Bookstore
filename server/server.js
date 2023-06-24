
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const uri = "mongodb+srv://mssplinter10:masterBookstore12@cluster0.lcmwfcu.mongodb.net/StoicReads?retryWrites=true&w=majority"; // <--- needs to be fixed with .env

//Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Routing
app.use("/", require("./routes/bookRoute"));

const port = process.env.PORT || 3000;

mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => {
        app.listen(port, () => console.log('Server has started on port: ' + port));
        console.log('MongoDB Connected')
    })
    .catch(err => console.log(err));



