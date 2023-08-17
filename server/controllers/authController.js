const User = require('../models/User');

module.exports.signup_post =  (req, res) => {
    const userID = Math.floor(Math.random() * 1000000000);
    const {email, password,userName,fullName} = req.body;
    User.create({userID,email, password,userName,fullName, isAdmin: false})
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({error: 'Error creating user'});
        });
}
module.exports.login_post = (req, res) => {

    res.send('new login')
}