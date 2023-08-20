const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ALREADY_EXIST_IN_DATABASE_CODE = 11000;
const THREE_DAYS = 3 * 24 * 60 * 60;
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: '',userName:''};
    const fillErrorsObjectWithMessages= ()=> {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    if(err.message.includes('User validation failed')){
        console.log(err);
        fillErrorsObjectWithMessages();
        return errors;
    }
    if(err.message.includes( 'incorrect email')){
        errors.email = 'email or password are incorrect';
    }
    if(err.message.includes( 'incorrect password')){
        errors.email = 'email or password are incorrect';
    }
    if(err.code === ALREADY_EXIST_IN_DATABASE_CODE ){
        if(err.keyPattern.email)
            errors.email = 'that email is already registered';
        if(err.keyPattern.userName)
            errors.userName = 'that userName is already registered';
        return errors;
    }

    return errors;
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: THREE_DAYS
    });
}

module.exports.signup_post = async (req, res) => {
    const userID = Math.floor(Math.random() * 1000000000);
    const {email, password,userName,fullName} = req.body;
    try{
        const user = await User.create({userID,email, password,userName,fullName, isAdmin: false})
        const token = createToken(user._id);
        res.cookie('jwt', token, { maxAge: THREE_DAYS * 1000, domain: 'localhost' });
        res.status(200).json(user._id);
    }catch (err){
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
}
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { maxAge: THREE_DAYS * 1000, domain: 'localhost' });
        res.status(200).json({ user: user._id });
    }catch (err){
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
}

module.exports.checkUserStatus = async (req, res) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                // Token is not valid or has expired
                res.json({ status: false });
            } else {
                // Token is valid
                res.json({ status: true, userId: decodedToken.id });
            }
        });
    } else {
        res.json({ status: false });
    }
}