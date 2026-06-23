const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../../.env"),
});

const {
    cleanupPastUnbookedSchedules,
} = require("../services/scheduleCleanup.service");

cleanupPastUnbookedSchedules()
    .then((result) => {
        console.log("Schedule cleanup done:", result);
        process.exit(0);
    })
    .catch((error) => {
        console.error("Schedule cleanup failed:", error);
        process.exit(1);
    });