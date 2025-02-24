const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');

const mainRouter = require('express').Router();

module.exports = (app) => {
    mainRouter.use('/api', homeController)
    mainRouter.use('/api/users', userController)
    app.use(mainRouter)
}

