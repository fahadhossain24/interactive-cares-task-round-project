const app = require('./app.js');
const mongoose = require('mongoose');
require('dotenv').config()

const port = process.env.PORT || 5000;

mongoose.connect(process.env.DB_CONNECTION_URL)
    .then(() => {
        console.log('database connection successfull');
        app.listen(port, () => {
            console.log('server runnning at port', port)
        })
    })

