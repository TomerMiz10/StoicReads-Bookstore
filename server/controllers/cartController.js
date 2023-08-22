const User = require("../models/User");
const Book = require("../models/Book");

module.exports.addToCart = async (req, res)  =>{
    const userId = req.body.userId;
    const bookId = req.body.book_id;
    const quantity = req.body.quantity || 1;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Ensure book stock is available
        if (book.quantity < quantity) {
            return res.status(400).json({ message: "Not enough stock available" });
        }
        // Decrement book quantity
        book.quantity -= quantity;
        await book.save();

        let user = await User.findOne({ _id: userId })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
       user.cart.push({bookId , quantity});
        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding book to cart" });
    }
};

module.exports.getOneUserCart = async (req, res) => {
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

module.exports.removeFromCart = async (req, res) => {
    const userId = req.body.userId;
    const bookId = req.body.bookId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const bookInCartIndex = user.cart.findIndex(item => item.bookId.toString() === bookId.toString());

        if (bookInCartIndex === -1) {
            return res.status(404).json({ message: "Book not found in cart" });
        }

        // If the quantity is more than 1, decrement. Otherwise, remove from the cart.
        if (user.cart[bookInCartIndex].quantity > 1) {
            user.cart[bookInCartIndex].quantity -= 1;
        } else {
            user.cart.splice(bookInCartIndex, 1);
        }

        // Increment the book quantity back to the inventory
        const book = await Book.findById(bookId);
        if (book) {
            book.quantity += 1;
            await book.save();
        }

        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        res.status(500).json({ message: "Error decrementing book from cart" });
    }
}
