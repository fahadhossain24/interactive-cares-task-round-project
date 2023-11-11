const express = require('express');
const cors = require('cors');
const { globalErrorHandler } = require('./middlewares/globalErrorHandler');
const CustomError = require('./utils/customError');
require('dotenv').config();

// initialize the app
const app = express();

// global middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('server running')
})

app.all('*', (req, res, next) => {
    const url = req.url || '';
    const error = new CustomError(`No route found ${url}`, 404)
    next(error);
})

// global error handler middlware
app.use(globalErrorHandler)


module.exports = app;