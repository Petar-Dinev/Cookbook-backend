const express = require('express');
const expressConfig = require('./configs/expressConfig');
const routesConfig = require('./configs/routes');
const dbConfig = require('./configs/dbConfig');

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

start()

async function start() {
    const app = express()

    dbConfig(app, MONGODB_CONNECTION)
    expressConfig(app)
    routesConfig(app)

    app.listen(PORT, () => console.log(`Server listen at port ${PORT}...`))
}

