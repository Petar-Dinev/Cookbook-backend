const { hasUser, isOwner } = require('../middlewares/guards');
const preloader = require('../middlewares/preloader');
const { getAllRecipes, getOneRecipeById, createRecipe, updateRecipe, deleteRecipe, likeRecipe } = require('../services/recipeService');
const errorParser = require('../utils/errorParser');

const recipeController = require('express').Router();

recipeController.get('/', async (req, res) => {
    const recipes = await getAllRecipes();
    res.json({ result: recipes });
});

recipeController.post('/', hasUser(), async (req, res) => {
    const { title, category, imageUrl, ingredients, description } = req.body;

    try {

        if (!title || !category || !imageUrl || !ingredients || !description) {
            throw new Error('All fields are required');
        }

        const recipe = await createRecipe({
            title,
            category,
            imageUrl,
            ingredients,
            description,
            owner: req.user._id
        });

        res.status(201).json({ result: recipe });

    } catch (err) {
        res.status(400).json({ message: errorParser(err) });
    }

});


recipeController.get('/:id', preloader(), async (req, res) => {
    res.json({ result: req.item });
});

recipeController.put('/:id', hasUser(), preloader(), isOwner(), async (req, res) => {
    const { title,
        category,
        imageUrl,
        ingredients,
        description } = req.body;

    try {
        if (
            !title || !category || !imageUrl || !description || !Array.isArray(ingredients) || ingredients.length === 0
        ) {
            throw new Error('All fields are required');
        }

        const recipe = await updateRecipe(req.params.id, recipeData);
        res.status(200).json({ result: recipe });

    } catch (err) {
        res.status(400).json({ message: errorParser(err) });
    }
});

recipeController.delete('/:id', hasUser(), preloader(), isOwner(), async (req, res) => {
    try {
        const deletedRecipe = await deleteRecipe(req.item);
        res.status(200).json({ result: deletedRecipe });
    } catch (err) {
        res.status(400).json({ message: errorParser(err) });
    }
});

recipeController.post('/:id/like', hasUser(), preloader(), async (req, res) => {

    try {
        const likedRecipe = await likeRecipe(req.params.id, req.user._id);
        res.status(200).json({ result: likedRecipe });
    } catch (err) {
        res.status(400).json({ message: errorParser(err) });
    }
});

module.exports = recipeController;