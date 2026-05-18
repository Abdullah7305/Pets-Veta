const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const adminController = require('../controllers/admin.controller');
const Router = express.Router();

Router
    .route('/admin/pending/doctors')
    .get(authMiddleware.protect, adminController.pendingDoctorList)

module.exports = Router;