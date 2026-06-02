const express = require("express");
const userDoctorController = require("../controllers/userdoctor.controller");

const router = express.Router();

router.get("/approved-doctors", userDoctorController.getApprovedDoctorsForUsers);

module.exports = router;