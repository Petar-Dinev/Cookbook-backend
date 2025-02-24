const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.json({ message: 'Cookbook API is running' });
})

module.exports = homeController;