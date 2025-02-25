const Recipe = require('../models/Recipe');

async function getAllRecipes() {
    return Recipe.find({});
}

async function getOneRecipeById(recipeId) {
    return Recipe.findById(recipeId);
}

async function createRecipe(recipeData) {
    return await Recipe.create(recipeData);
}

async function updateRecipe(recipeId, recipeData) {
    const recipe = Recipe.findById(recipeId);

    recipe.title = recipeData.title;
    recipe.category = recipeData.category;
    recipe.imageUrl = recipeData.imageUrl;
    recipe.description = recipeData.description;
    recipe.ingredients = recipeData.ingredients;
    recipe.title = recipeData.title;

    return await recipe.save();
}

async function deleteRecipe(recipeId) {
    return Recipe.findByIdAndDelete(recipeId);
}

async function likeRecipe(recipeId, userId) {
    const recipe = await Recipe.findById(recipeId);
    recipe.likes.push(userId);
    return await recipe.save();
}

module.exports = {
    getAllRecipes,
    getOneRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    likeRecipe
}