
module.exports.signup_post = (req, res) => {
    res.send('new signup');
}
module.exports.login_post = (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
    res.send('new login');
}