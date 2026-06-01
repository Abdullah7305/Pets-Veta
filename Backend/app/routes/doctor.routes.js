const express = require('express');
const authMiddlware = require('../middleware/auth.middleware');
const authenticateRole = require('../middleware/authorizeRole.middleware');
const doctorController = require('../controllers/doctor.controller');


const Router = express.Router();

Router
    .route("/add/service")
    .post(authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.doctorServicePricing)


module.exports = Router;