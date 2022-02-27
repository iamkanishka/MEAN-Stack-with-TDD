require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const moment = require('moment');
const app = express();
const connectDB = require("./Config/db");
connectDB()

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api', (req, res) => {
    res.json({msg: 'Hello from Mabel!'});
});

// Adding other routes
app.use('/api/user/', require('./routes/user'));
app.use('/api/product', require('./routes/product'));

// Universal Error Handler
app.use((err, req, res, next) => {
    // console.error(err.stack);
    // TODO: Log with winston
    res.status(500).send('Something broke!');
});

app.listen(process.env.HOST_PORT, () => {
    console.log(`Listening at http://${process.env.HOST_NAME}:${process.env.HOST_PORT}`);
});

module.exports = app;
