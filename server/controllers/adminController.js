const adminService = require("../services/adminService");

const createBook = async (req, res) => {
    try {
        const {title, author, price, quantity, bookDetails} = req.body;
        const newBook = await adminService.createBook(title, author, price, quantity, bookDetails);
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
        console.log('Successfully deleted a book from the DB')
        return res.status(201).json({ message: 'Book deleted successfully', success:true});
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
       const bookID = req.body.bookID;
       const newPrice = req.body.price;

        await adminService.changeBookPrice(bookID, newPrice);
        res.status(200).json({ message: 'Price changed successfully', success: true});
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


const changeBookQuantity = async (req, res) => {
    try {
        const bookID = req.body.bookID;
        const newQuantity = req.body.quantity;

        await adminService.changeBookQuantity(bookID, newQuantity);
        res.status(200).json({ message: 'Quantity changed successfully', success: true});
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
    changeBookQuantity,
};



