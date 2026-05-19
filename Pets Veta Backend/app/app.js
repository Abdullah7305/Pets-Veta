const dotenv = require('dotenv/config');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const authRouter = require('./routes/auth.routes')
const adminRouter = require('./routes/admin.routes');
const globalErrorHandler = require('./middleware/globalErrorHandler');

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser());
app.use(globalErrorHandler);

app.use('/api', authRouter)
app.use('/api', adminRouter)

module.exports = app;