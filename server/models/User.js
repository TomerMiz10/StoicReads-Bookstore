const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail } = require('validator');
const bcrypt = require('bcrypt');
const Order = require('./Order');   //import Order Schema

const BookInCartSchema = new Schema({
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const User = new Schema({
    userID: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: [true,"please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail,'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true,"please enter a password"],
        minlength: [6,"password must be at least 6 characters"]
    },
    userName: {
        type: String,
        required: [true,"please enter a userName"],
        unique: true,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    },
    fullName: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    cart: [BookInCartSchema],
    pastOrders: [Order.schema]  //use .schema to ref Order schema
});
User.post('save', function(doc, next) {
    console.log('new user was created & saved', doc);
    next();
});

User.pre('save', async function(next) {
    try{
        this.password = await bcrypt.hashSync(this.password, parseInt(process.env.SALT));
        next();
    } catch(err) {
        console.warn("An error has been thrown when attempting to hash the password: ", err);
    }

});

User.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if(user){
        const auth = await bcrypt.compareSync(password, user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

module.exports = mongoose.model('User', User);