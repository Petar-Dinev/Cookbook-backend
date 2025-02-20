const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET;

async function register(email, username, password) {
    const exist = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (exist) {
        throw new Error('Email is already taken!')
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, password: hashedPassword });
    const token = createToken({ _id: user._id, email: user.email, username: user.username });

    return { email, username, accessToken: token };
}

async function login() {
    const match = await bcrypt.compare(password, exist.password)

    if (!match) {
        throw new Error('Invalid email or password!')
    }
}

function createToken(userData) {
    return jwt.sign(userData, JWT_SECRET)
}

module.exports = {
    register,
}