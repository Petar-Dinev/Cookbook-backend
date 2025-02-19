const homeController = require('../controllers/homeController');

const mainRouter = require('express').Router();

module.exports = (app) => {
    mainRouter.use('/', homeController)
    app.use(mainRouter)
}

