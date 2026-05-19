const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const adminController = require('../controllers/admin.controller');
const Router = express.Router();

Router
    .route('/admin/pending/doctors')
    .get(authMiddleware.protect, adminController.pendingDoctorList)

Router
    .route('/admin/approve/doctor')
    .post(authMiddleware.protect, adminController.approveDoctor)

Router
    .route('/admin/reject/doctor')
    .post(authMiddleware.protect, adminController.rejectDoctor)

module.exports = Router;