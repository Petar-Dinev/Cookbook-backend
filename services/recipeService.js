const Recipe = require('../models/Recipe');

async function getAllRecipes() {
    return (await Recipe.find({})).toSorted({ createdAt: -1 });
}

async function getOneRecipeById(recipeId) {
    return Recipe.findById(recipeId);
}

async function createRecipe(recipeData) {
    return Recipe.create(recipeData);
}

async function updateRecipe(recipeId, recipeData) {
    const recipe = await Recipe.findById(recipeId);

    checkRecipe(recipe);

    recipe.title = recipeData.title;
    recipe.category = recipeData.category;
    recipe.imageUrl = recipeData.imageUrl;
    recipe.description = recipeData.description;
    recipe.ingredients = recipeData.ingredients;

    return recipe.save();
}

async function deleteRecipe(recipeId) {
    const recipe = await Recipe.findById(recipeId);

    checkRecipe(recipe);

    return Recipe.findByIdAndDelete(recipeId);
}

async function likeRecipe(recipeId, userId) {
    const recipe = await Recipe.findById(recipeId);

    checkRecipe(recipe);

    if (recipe.likes.some(id => id.toString() == userId.toString())) {
        throw new Error('You can like recipe once!');
    }

    recipe.likes.push(userId);
    return recipe.save();
}

function checkRecipe(recipe) {
    if (!recipe) {
        throw new Error('Recipe not found');
    }
}

module.exports = {
    getAllRecipes,
    getOneRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    likeRecipe
}