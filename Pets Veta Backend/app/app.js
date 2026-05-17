const dotenv = require('dotenv/config');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const authRouter = require('./routes/auth.routes')

app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

app.use('/api', authRouter)

module.exports = app;