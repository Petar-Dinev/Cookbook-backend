const express = require('express');
const homeController = require('./controllers/homeController');
const expressConfig = require('./configs/expressConfig');
require("dotenv").config();

const PORT = process.env.PORT || 5000;

start()

async function start() {
    const app = express()

    expressConfig(app)
    app.use(homeController)

    app.listen(PORT, () => console.log(`Server listen at port ${PORT}...`))
}

