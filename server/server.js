const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const env = require("custom-env").env();
const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use("/", require("./routes/bookRoute"));

mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => {
        app.listen(port, () => console.log('Server has started on port: ' + port));
        console.log('MongoDB Connected')
    })
    .catch(err => console.log(err));



