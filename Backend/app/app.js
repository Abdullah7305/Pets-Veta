const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env"), quiet: true });
require("./config/redis.config");

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const defaultClientUrls = [
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

const isAllowedLocalOrigin = (origin) => {
  if (!origin) return true;
  if (defaultClientUrls.includes(origin)) return true;

  return /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
};

const authRouter = require("./routes/auth.routes");
const adminRouter = require("./routes/admin.routes");
const doctorRouter = require("./routes/doctor.routes");
const userRoutes = require("./routes/userdoctor.route");
const petOwnerRoutes = require("./routes/petOwner.routes");
const aiRouter = require("./routes/ai.routes");
const { createChatRouter } = require("../dist/api/routes/chat.routes");
const paymentRouter = require("./routes/payment.routes");
const sellerRouter = require("./routes/seller.routes");
const marketplaceRouter = require("./routes/marketplace.routes");
const marketplaceOrderRouter = require("./routes/marketplaceOrder.routes");
const messageRouter = require("./routes/message.routes");
const notificationRouter = require("./routes/notification.routes");

const paymentController = require("./controllers/payment.controller");
const globalErrorHandler = require("./middleware/globalErrorHandler");

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedLocalOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

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
app.use("/api/v1/ai", aiRouter);
app.use("/api/v1/ai", createChatRouter());
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/seller", sellerRouter);
app.use("/api/v1/marketplace", marketplaceRouter);
app.use("/api/v1/orders", marketplaceOrderRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/notifications", notificationRouter);

app.use(globalErrorHandler);

module.exports = app;

