const express = require("express");
const adminRoute = express.Router();

const {
    createBook,
    deleteBook,
    changeBookPrice,

} = require("../controllers/adminController");


adminRoute.post("/createBooks", createBook);
adminRoute.get("/changeBookPrice/:bookID", changeBookPrice);
adminRoute.delete("/deleteBook/:bookID", deleteBook);


module.exports = adminRoute;
