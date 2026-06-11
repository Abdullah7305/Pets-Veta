const express = require('express');
const authMiddlware = require('../middleware/auth.middleware');
const authenticateRole = require('../middleware/authorizeRole.middleware');
const doctorController = require('../controllers/doctor.controller');
const doctorScheduleController = require('../controllers/doctorSchedule.controller');
const { doctorLimiter } = require('../middleware/rateLimiter')

const Router = express.Router();

Router
    .route("/add/service")
    .post(doctorLimiter, authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.createDoctorServicePricing);

Router
    .route('/get/services')
    .get(doctorLimiter, authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.fetchDoctorServices);

Router
    .route('/edit/service')
    .patch(doctorLimiter, authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.updateDoctorService);

Router
    .route("/delete/service")
    .delete(
        authMiddlware.protect,
        authenticateRole.authenticateUserRole("Doctor"),
        doctorController.deleteDoctorService
    );

Router
    .route('/appointments')
    .get(doctorLimiter, authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.fetchDoctorAppointments);

Router
    .route("/schedule")
    .post(
        authMiddlware.protect,
        authenticateRole.authenticateUserRole("Doctor"),
        doctorScheduleController.createDoctorSchedule
    );

Router
    .route("/schedule/me")
    .get(
        doctorLimiter,
        authMiddlware.protect,
        authenticateRole.authenticateUserRole("Doctor"),
        doctorScheduleController.getDoctorSchedule
    );

Router
    .route("/schedule/doctor/:doctorId")
    .get(doctorScheduleController.getDoctorSchedulesByDoctorId);



module.exports = Router;