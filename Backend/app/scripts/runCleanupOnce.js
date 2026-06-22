require("dotenv").config();
const {
    cleanupExpiredAppointments,
} = require("../services/appointmentCleanup.service");

cleanupExpiredAppointments()
    .then((result) => {
        console.log("Cleanup done:", result);
        process.exit(0);
    })
    .catch((error) => {
        console.error("Cleanup failed:", error);
        process.exit(1);
    });