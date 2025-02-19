const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.json({ message: 'hello' })
})

module.exports = homeController;