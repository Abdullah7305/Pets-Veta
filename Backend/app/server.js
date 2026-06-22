const app = require('./app');
const { startAppointmentCleanupJob } = require('./jobs/appointmentCleanup.job')
const { startScheduleCleanupJob } = require('./jobs/scheduleCleanup')
const port = 8000;

app.listen(port, () => {
    console.log("Server is running");

    startAppointmentCleanupJob();
    startScheduleCleanupJob();
})

