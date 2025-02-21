const { register } = require('../services/userService');
const errorParser = require('../utils/errorParser');

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
        console.log(err.name);
        console.log(err.message);
        
        res.status(400).json({ message: errorParser(err) })
    }

});

userController.get('/logout', (req, res) => {
    console.log(req.headers);
    res.status(200).json({ message: 'Logout was successful' })
})

module.exports = userController;