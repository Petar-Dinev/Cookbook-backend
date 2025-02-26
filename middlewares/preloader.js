const { getOneRecipeById } = require("../services/recipeService");
const errorParser = require("../utils/errorParser");

module.exports = () => {
    return async (req, res, next) => {
        const itemId = req.params.id;

        if (!itemId) {
            return next();
        }

        try {
            const item = await getOneRecipeById(itemId);
            req.item = item;
            return next();
        } catch (err) {
            return res.status(404).json({ message: errorParser(err) });
        }

    }
}