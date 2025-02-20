const { register } = require('../services/userService');

const userController = require('express').Router();

userController.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    res.status(200).json({ message: 'Login was successful' })
});

userController.post('/register', async (req, res) => {
    console.log(req.body);

    const { email, username, password } = req.body;
    try {
        const result = await register(email, username, password)
        res.status(201).json(result)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }

});

userController.get('/logout', (req, res) => {
    console.log(req.headers);
    res.status(200).json({ message: 'Logout was successful' })
})

module.exports = userController;