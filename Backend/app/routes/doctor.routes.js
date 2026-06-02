const express = require('express');
const authMiddlware = require('../middleware/auth.middleware');
const authenticateRole = require('../middleware/authorizeRole.middleware');
const doctorController = require('../controllers/doctor.controller');


const Router = express.Router();

Router
    .route("/add/service")
    .post(authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.createDoctorServicePricing);

Router
    .route('/get/services')
    .get(authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.fetchDoctorServices);

Router
    .route('/edit/service')
    .patch(authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.updateDoctorService);


Router
    .route('/delete/service')
    .delete(authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.deleteDoctorService);



module.exports = Router;