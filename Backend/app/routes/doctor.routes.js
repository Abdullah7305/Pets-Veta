// const express = require('express');
// const authMiddlware = require('../middleware/auth.middleware');
// const authenticateRole = require('../middleware/authorizeRole.middleware');
// const doctorController = require('../controllers/doctor.controller');
// const doctorScheduleController = require('../controllers/doctorSchedule.controller');

// const Router = express.Router();

// Router
//     .route("/add/service")
//     .post(authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.createDoctorServicePricing);

// Router
//     .route('/get/services')
//     .get(authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.fetchDoctorServices);

// Router
//     .route('/edit/service')
//     .patch(authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.updateDoctorService);


// Router
//     .route('/delete/service')
//     .delete(authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.deleteDoctorService);


// Router
//     .route("/schedule")
//     .post(
//         authMiddlware.protect,
//         authenticateRole.authenticateUserRole('Doctor'),
//         doctorScheduleController.createDoctorSchedule
//     );

// Router
//     .route("/schedule/me")
//     .get(
//         authMiddlware.protect,
//         authenticateRole.authenticateUserRole('Doctor'),
//         doctorScheduleController.getDoctorSchedule
//     );

// Router
//     .route("/schedule/:id")
//     .put(
//         authMiddlware.protect,
//         authenticateRole.authenticateUserRole('Doctor'),
//         doctorScheduleController.updateDoctorSchedule
//     )
//     .delete(
//         authMiddlware.protect,
//         authenticateRole.authenticateUserRole('Doctor'),
//         doctorScheduleController.deleteDoctorSchedule
//     );

// Router
//     .route("/schedule/doctor/:doctorId")
//     .get(doctorScheduleController.getDoctorSchedulesByDoctorId);

// module.exports = Router;