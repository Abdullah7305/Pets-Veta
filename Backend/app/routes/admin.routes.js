const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const adminController = require('../controllers/admin.controller');
const authenticateRole = require('../middleware/authorizeRole.middleware')
const Router = express.Router();

Router
    .route('/all/doctors')
    .get(authMiddleware.protect, authenticateRole.authenticateUserRole('Admin'), adminController.allDoctorList)

Router
    .route('/doctor-stats')
    .get(authMiddleware.protect, authenticateRole.authenticateUserRole('Admin'), adminController.fetchDoctorStats)

Router
    .route('/pending/doctors')
    .get(authMiddleware.protect, authenticateRole.authenticateUserRole('Admin'), adminController.pendingDoctorList)

Router
    .route('/approved/doctors')
    .get(authMiddleware.protect, authenticateRole.authenticateUserRole('Admin'), adminController.approvedDoctor)

Router
    .route('/approve-pending/doctor')
    .post(authMiddleware.protect, authenticateRole.authenticateUserRole('Admin'), adminController.approveupdateDoctor)

Router
    .route('/reject/doctor')
    .post(authMiddleware.protect, authenticateRole.authenticateUserRole('Admin'), adminController.rejectDoctor)

module.exports = Router;