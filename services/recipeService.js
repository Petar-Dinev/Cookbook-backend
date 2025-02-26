const Recipe = require('../models/Recipe');

async function getAllRecipes() {
    return Recipe.find({}).sort({ createdAt: -1 });
}

async function getOneRecipeById(recipeId) {
    const recipe = await Recipe.findById(recipeId);
    checkRecipe(recipe);
    return recipe;
}

async function createRecipe(recipeData) {
    return Recipe.create(recipeData);
}

async function updateRecipe(recipeId, recipeData) {
    const recipe = await Recipe.findById(recipeId);

    checkRecipe(recipe);

    recipe = Object.assign(recipe, recipeData);

    return recipe.save();
}

async function deleteRecipe(recipe) {
    checkRecipe(recipe);

    await Recipe.findByIdAndDelete(recipe._id);

    return recipe;
}

async function likeRecipe(recipeId, userId) {
    const recipe = await Recipe.findById(recipeId);

    checkRecipe(recipe);

    if (recipe.owner.toString() === userId.toString()) {
        throw new Error('You cannot like your own recipe!');
    }

    if (recipe.likes.some(id => id.toString() === userId.toString())) {
        throw new Error('You can like a recipe only once!');
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