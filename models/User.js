const { Schema, model } = require('mongoose');

const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/i;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: (value) => emailPattern.test(value),
            message: 'Email must be a valid email address!'
        },
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [3, 'Username must be at least 3 characters long'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
    }
}, { timestamps: true });

userSchema.index({ email: 1 }, { collation: { locale: 'en', strength: 2 } });

const User = model('User', userSchema);

module.exports = User;