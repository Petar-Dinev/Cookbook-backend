const userController = require('express').Router();

userController.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    res.status(200).json({ message: 'Login was successful' })
});

userController.post('/register', (req, res) => {
    const { email, username, password } = req.body;
    console.log(email, username, password);

    res.status(201).json({ message: 'Register was succesful' })
});

userController.get('/logout', (req, res) => {
    console.log(req.headers);
    res.status(200).json({ message: 'Logout was successful' })
})

module.exports = userController;