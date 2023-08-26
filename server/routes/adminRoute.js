const express = require("express");
const adminRoute = express.Router();

const {
    createBook,
    deleteBook,
    changeBookPrice,
    changeBookQuantity,

} = require("../controllers/adminController");


adminRoute.post("/createBooks", createBook);
adminRoute.put("/changeBookPrice", changeBookPrice);
adminRoute.put("/changeBookQuantity", changeBookQuantity);
adminRoute.delete("/deleteBook/:bookID", deleteBook);


module.exports = adminRoute;
