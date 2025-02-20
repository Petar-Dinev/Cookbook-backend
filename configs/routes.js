const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');

const mainRouter = require('express').Router();

module.exports = (app) => {
    mainRouter.use('/', homeController)
    mainRouter.use('/users', userController)
    app.use(mainRouter)
}

