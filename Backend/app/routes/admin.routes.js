const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const adminController = require('../controllers/admin.controller');
const Router = express.Router();

Router
    .route('/pending/doctors')
    .get(authMiddleware.protect, adminController.pendingDoctorList)

Router
    .route('/approved/doctors')
    .get(authMiddleware.protect, adminController.approvedDoctor)

Router
    .route('/reject/doctor')
    .post(authMiddleware.protect, adminController.rejectDoctor)

module.exports = Router;