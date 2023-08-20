const express = require("express");
const adminRoute = express.Router();

const {
    createBook,
    deleteBook,
    changeBookPrice,

} = require("../controllers/adminController");


adminRoute.post("/admin/createBooks", createBook);
adminRoute.get("/admin/changeBookPrice", changeBookPrice);
adminRoute.delete("/admin/deleteBook", deleteBook);


module.exports = adminRoute;
