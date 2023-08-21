const User = require("../models/User");
const Book = require("../models/Book");

module.exports.addToCart = async (req, res)  =>{
    const userId = req.body.userId;
    const bookId = req.body.book_id;
    const quantity = req.body.quantity || 1;

    try {
        console.log("bookId", bookId)
        console.log("userId", userId);
        let user = await User.findOne({ _id: userId })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
       user.cart.push({bookId, quantity});
        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding book to cart" });
    }
};

module.exports.getCart = async (req, res) => {
    const userId = req.params.userId;
    console.log('userId:', userId)
    try {
        const user = await User.findById(userId).populate('cart.bookId');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user.cart);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error fetching cart" });
    }
};