const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const authRouter = require('./routes/auth.routes')
const adminRouter = require('./routes/admin.routes');
const doctorRouter = require('./routes/doctor.routes');
const globalErrorHandler = require('./middleware/globalErrorHandler');
const userdoctorRoutes = require("./routes/userdoctor.route");


app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/doctor', doctorRouter)
app.use("/api/doctors", userdoctorRoutes);

app.use(globalErrorHandler);
module.exports = app;