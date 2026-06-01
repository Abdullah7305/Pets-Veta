const express = require("express");
const doctorController = require("../controllers/userdoctor.controller");

const router = express.Router();

router.get("/approved", doctorController.getApprovedDoctorsForUsers);

module.exports = router;