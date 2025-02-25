const { Schema, model, Types } = require('mongoose');

const imageUrlPattern = /^https?:\/\/.+/i

const recipeSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'Title is required'],
        minLength: [4, 'Recipe title must be at least 4 characters long'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['salad', 'main', 'dessert'],
            message: 'Invalid category'
        },
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
        validate: {
            validator: (value) => imageUrlPattern.test(value),
            message: 'Image URL must start with http:// or https://'
        },
        trim: true
    },
    ingredients: {
        type: [String],
        required: [true, 'Ingredients are required'],
        validate: {
            validator: (arr) => Array.isArray(arr) && arr.length > 0,
            message: 'At least one ingredient is required'
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [10, 'Description must be at least 10 characters long'],
        trim: true
    },
    likes: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'Recipe need to have owner']
    }
},
    { timestamps: true }
);

recipeSchema.index({ title: 1 }, { collation: { locale: 'en', strength: 2 } });

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;