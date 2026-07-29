const http = require("http");

const app = require("./app");
const { initSocket } = require("./socket/socket");

const { startAppointmentCleanupJob } = require("./jobs/appointmentCleanup.job");
const { startScheduleCleanupJob } = require("./jobs/scheduleCleanup");
const { startOrderCleanupJob } = require("./jobs/orderCleanup.job"); 

const port = process.env.PORT || 8000;

const httpServer = http.createServer(app);

const startServer = async () => {
  try {
    await initSocket(httpServer);

    httpServer.listen(port, () => {
      console.log(`Server is running on port ${port}`);

      startAppointmentCleanupJob();
      startScheduleCleanupJob();
      startOrderCleanupJob();
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};


startServer();