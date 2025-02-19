const mongoose = require('mongoose');
require('dotenv').config()


module.exports = async (app, MONGODB_CONNECTION) => {
    try {
        await mongoose.connect(MONGODB_CONNECTION)
        console.log('Data base connected');
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}