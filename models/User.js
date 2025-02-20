const { Schema, model } = require('mongoose');

const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/i

const userSchema = new Schema({
    email: {
        type: String,
        validate: emailPattern,
        required: true
    },
    username: {
        type: String,
        minLength: [3, 'Username must be at least 3 characters long'],
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.index({ email: 1 }, { collation: { locale: 'en', strength: 2 } })

const User = model('User', userSchema);

module.exports = User;