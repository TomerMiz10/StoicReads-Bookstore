const express = require('express');   //Imports the Express framework. allows us to create and configure the server.
const path = require('path'); //Provides utilities for working with file and directory paths.
const bodyParser = require('body-parser');  //Parses incoming request bodies. makes data available in 'req.body'
const cors = require('cors'); //Enables Cross-Origin Resources Sharing. allows requests from other domains.
const mongoose = require('mongoose'); //Connces to a MongoDB database using Mongoose library.
const indexRouter=require('./routes');  //imports index router file. cotains defined routes for server.
// const newLocal = require('custom-env')  //Imports custom-env package for configuring environment variables.
// newLocal.env(process.env.NODE_ENV,'./config');  //Sets the environment variables

const PORT = 4000;
const CONNECTION_STRING = 'mongodb://127.0.0.1/StoicReads'
mongoose.connect(process.env.CONNECTION_STRING,{useNewUrlParser:true,useUnifiedTopology:true}); //Connects to the MongoDB database using the provided connection string.
const app = express();  // Creates an instance of the Express application.
app.use(cors());  // Applies the CORS middleware to allow cross-origin requests.
app.use(bodyParser.urlencoded({extended:true}));  // Configures the server to parse URL-encoded request bodies.
app.use(express.json());  //Configures the server to parse JSON request bodies.
app.use(express.static(path.join(__dirname, './client')));  //Serves static files from specified dir, like HTML, CSS and JS files.
app.use('/api',indexRouter);  //Mounts the index router at the '/api' endpoint.

app.listen(PORT, ()=>console.log('Server is online.')); //Starts the server and listens for incoming requests on the specified port.

