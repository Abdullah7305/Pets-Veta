<<<<<<< HEAD
const express = require("express");

const doctorController = require("../controllers/doctor.controller");
const doctorScheduleController = require("../controllers/doctorSchedule.controller");

const authMiddlware = require("../middleware/auth.middleware");
const authenticateRole = require("../middleware/authorizeRole.middleware");
=======
const express = require('express');
const authMiddlware = require('../middleware/auth.middleware');
const authenticateRole = require('../middleware/authorizeRole.middleware');
const doctorController = require('../controllers/doctor.controller');
const doctorScheduleController = require('../controllers/doctorSchedule.controller');
const { doctorLimiter } = require('../middleware/rateLimiter')
>>>>>>> 8dc65a4f1d5169809732c30d2403adcb090d5262

const Router = express.Router();

Router
    .route("/add/service")
<<<<<<< HEAD
    .post(
        authMiddlware.protect,
        authenticateRole.authenticateUserRole("Doctor"),
        doctorController.createDoctorServicePricing
    );

Router
    .route("/get/services")
    .get(
        authMiddlware.protect,
        authenticateRole.authenticateUserRole("Doctor"),
        doctorController.fetchDoctorServices
    );

Router
    .route("/edit/service")
    .patch(
        authMiddlware.protect,
        authenticateRole.authenticateUserRole("Doctor"),
        doctorController.updateDoctorService
    );
=======
    .post(doctorLimiter, authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.createDoctorServicePricing);

Router
    .route('/get/services')
    .get(doctorLimiter, authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.fetchDoctorServices);

Router
    .route('/edit/service')
    .patch(doctorLimiter, authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.updateDoctorService);
>>>>>>> 8dc65a4f1d5169809732c30d2403adcb090d5262

Router
    .route("/delete/service")
    .delete(
        authMiddlware.protect,
        authenticateRole.authenticateUserRole("Doctor"),
        doctorController.deleteDoctorService
    );

Router
<<<<<<< HEAD
    .route("/appointments")
    .get(
        authMiddlware.protect,
        authenticateRole.authenticateUserRole("Doctor"),
        doctorController.fetchDoctorAppointments
    );

Router
    .route("/profile")
    .get(
        authMiddlware.protect,
        authenticateRole.authenticateUserRole("Doctor"),
        doctorController.getDoctorProfile
    )
    .patch(
        authMiddlware.protect,
        authenticateRole.authenticateUserRole("Doctor"),
        doctorController.updateDoctorProfile
    );
=======
    .route('/appointments')
    .get(doctorLimiter, authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.fetchDoctorAppointments);
>>>>>>> 8dc65a4f1d5169809732c30d2403adcb090d5262

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

Router
    .route("/schedule/:id")
    .put(
        doctorLimiter,
        authMiddlware.protect,
        authenticateRole.authenticateUserRole("Doctor"),
        doctorScheduleController.updateDoctorSchedule
    )
    .delete(
        authMiddlware.protect,
        authenticateRole.authenticateUserRole("Doctor"),
        doctorScheduleController.deleteDoctorSchedule
    );

module.exports = Router;