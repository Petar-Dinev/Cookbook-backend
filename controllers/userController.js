const { isGuest } = require('../middlewares/guards');
const { register, login } = require('../services/userService');
const errorParser = require('../utils/errorParser');

const userController = require('express').Router();

userController.post('/login', isGuest(), async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new Error('All fields are required');
        }
        const result = await login(email, password);
        res.status(200).json(result);
    } catch (err) {
        res.status(401).json({ message: errorParser(err) });
    }
});

userController.post('/register', isGuest(), async (req, res) => {

    const { email, username, password } = req.body;
    try {
        if (!email || !username || !password) {
            throw new Error('All fields are required');
        }
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }
        const result = await register(email, username, password);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: errorParser(err) });
    }

});

module.exports = userController;