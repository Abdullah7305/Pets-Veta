const express = require('express');
const authMiddlware = require('../middleware/auth.middleware');
const authenticateRole = require('../middleware/authorizeRole.middleware');
const doctorController = require('../controllers/doctor.controller');
const doctorScheduleController = require('../controllers/doctorSchedule.controller');
const upload = require('../config/multer.config');
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
    .route('/profile')
    .get(
        doctorLimiter,
        authMiddlware.protect,
        authenticateRole.authenticateUserRole('Doctor'),
        doctorController.getDoctorProfile
    )
    .patch(
        doctorLimiter,
        authMiddlware.protect,
        authenticateRole.authenticateUserRole('Doctor'),
        upload.single('profileImage'),
        doctorController.updateDoctorProfile
    );

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
        authMiddlware.protect,
        authenticateRole.authenticateUserRole("Doctor"),
        doctorScheduleController.getDoctorSchedule
    );

Router
    .route("/schedule/doctor/:doctorId")
    .get(doctorScheduleController.getDoctorSchedulesByDoctorId);

Router
    .route("/appointments/:appointmentId/complete")
    .patch(
        authMiddlware.protect,
        authenticateRole.authenticateUserRole("Doctor"),
        doctorController.completeAppointment
    );

Router
    .route('/connect/onboarding')
    .get(
        authMiddlware.protect,
        authenticateRole.authenticateUserRole('Doctor'),
        doctorController.initiateStripeOnboarding
    );

Router
    .route('/connect/status')
    .get(
        authMiddlware.protect,
        authenticateRole.authenticateUserRole('Doctor'),
        doctorController.checkStripeConnectStatus
    );

Router
    .route('/appointments/verify-code')
    .post(
        doctorLimiter,
        authMiddlware.protect,
        authenticateRole.authenticateUserRole('Doctor'),
        doctorController.verifyAppointmentCode
    );


module.exports = Router;
