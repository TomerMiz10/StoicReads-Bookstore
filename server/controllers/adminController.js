const adminService = require("../services/adminService");

const createBook = async (req, res) => {
    try {
        const {title, author} = req.body;
        const newBook = await adminService.createBook(title, author);
        console.log('Successfully created a new book and inserted it into the DB')
        res.status(201).json(newBook);
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .json({
                error: "An error occurred while creating the product",
                success: false,
            });
    }
};

const deleteBook = async (req, res) => {
    try {
        await adminService.deleteBook(req.params.bookID);
        console.log('Successfully created a new book and inserted it into the DB')
        return res.status(201);
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .json({
                error: "An error occurred while creating the product",
                success: false,
            });
    }
};


const changeBookPrice = async (req, res) => {
    try {
        const {bookID, price} = req.params;

        await adminService.changeBookPrice(bookID, price);
        console.log('Successfully updated the book price')
        return res.status(201);
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .json({
                error: "An error occurred while creating the product",
                success: false,
            });
    }
};


module.exports = {
    createBook,
    deleteBook,
    changeBookPrice,
};



