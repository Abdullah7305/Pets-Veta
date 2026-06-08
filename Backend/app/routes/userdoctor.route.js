const express = require("express");
const userDoctorController = require("../controllers/userdoctor.controller");
const { globalUserLimiter } = require('../middleware/rateLimiter')

const Router = express.Router();

Router
    .route("/approved-doctors")
    .get(userDoctorController.getApprovedDoctorsForUsers);

Router
    .route('/doctor-profile')
    .get(userDoctorController.getDoctorById)

module.exports = Router;