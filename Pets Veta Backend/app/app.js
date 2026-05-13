const dotenv = require('dotenv/config');
const cors = require('cors');
const express = require('express');
const app = express();


app.use(express.json());
app.use(cors({
    credentials: true
}));


module.exports = app;