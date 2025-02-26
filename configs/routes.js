const homeController = require('../controllers/homeController');
const recipeController = require('../controllers/recipeController');
const userController = require('../controllers/userController');

module.exports = (app) => {
    app.use('/api', homeController)
    app.use('/api/users', userController)
    app.use('/api/recipes', recipeController)
}

