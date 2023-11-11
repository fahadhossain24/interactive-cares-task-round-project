const express = require('express');
const cors = require('cors');
const { globalErrorHandler } = require('./middlewares/globalErrorHandler');
const CustomError = require('./utils/customError');
const itinerariesRouter = require('./routers/itineraries.routes');
const authRouter = require('./routers/auth.routes');
require('dotenv').config();

// initialize the app
const app = express();

// global middleware
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/itineraries', itinerariesRouter)

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