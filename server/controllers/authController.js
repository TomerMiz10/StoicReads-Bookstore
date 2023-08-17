const User = require('../models/User');
const ALREADY_EXIST_IN_DATABASE = 11000;

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
        errors.email = 'that email is not registered';
    }
    if(err.message.includes( 'incorrect password')){
        errors.password = 'that password is incorrect';
    }
    if(err.code === ALREADY_EXIST_IN_DATABASE ){
        errors.email = 'that userName or email is already registered';
        errors.userName = 'that userName or email is already registered';
        return errors;
    }

    return errors;
}

module.exports.signup_post =  (req, res) => {
    const userID = Math.floor(Math.random() * 1000000000);
    const {email, password,userName,fullName} = req.body;
    User.create({userID,email, password,userName,fullName, isAdmin: false})
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => {
            const errors = handleErrors(err);
            res.status(400).json(errors);
        });
}
module.exports.login_post = (req, res) => {

    res.send('new login')
}