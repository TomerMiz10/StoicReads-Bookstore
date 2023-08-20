const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const env = require("custom-env").env();
const cookieParser = require('cookie-parser');

//Middleware
app.use(cors({
    origin: 'http://localhost:63342',
    credentials: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// auth router attaches /login, /logout, and /callback routes to the baseURL


// Routing
app.use("/book", require("./routes/bookRoute"));
app.use("/auth", require("./routes/authRoute"));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        const port = process.env.PORT;
        app.listen(port, () => console.log('Server has started on port: ' + port));
        console.log('MongoDB Connected')
    })
    .catch(err => console.log(err));



