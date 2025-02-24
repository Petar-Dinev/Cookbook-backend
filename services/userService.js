const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'ashdasdaskdalsdhasdhashd';

async function register(email, username, password) {
    const exist = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (exist) {
        throw new Error('Email is already taken!')
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, password: hashedPassword });
    const token = createToken({ _id: user._id, email: user.email, username: user.username });

    return { _id: user._id, email, username, accessToken: token };
}

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Invalid email or password!')
    }
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw new Error('Invalid email or password!')
    }

    const token = createToken({ _id: user._id, email: user.email, username: user.username });

    return { _id: user._id, email: user.email, username: user.username, accessToken: token };

}

function createToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' })
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    register,
    login,
    verifyToken
}