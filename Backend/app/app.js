const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("./config/redis.config");

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const authRouter = require("./routes/auth.routes");
const adminRouter = require("./routes/admin.routes");
const doctorRouter = require("./routes/doctor.routes");
const userRoutes = require("./routes/userdoctor.route");
const petOwnerRoutes = require("./routes/petOwner.routes");

// Stripe payment imports
const paymentRouter = require("./routes/payment.routes");
const paymentController = require("./controllers/payment.controller");

const globalErrorHandler = require("./middleware/globalErrorHandler");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// TODO: STRIPE PAYMENT API

app.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  paymentController.stripeWebhook
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/petOwner", petOwnerRoutes);

// Payment routes
app.use("/api/v1/payment", paymentRouter);

app.use(globalErrorHandler);

module.exports = app;