const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./modules/auth/auth.routes");
const clientRoutes = require("./modules/client/client.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");
const userRoutes = require("./modules/user/user.routes");
const masterRoutes = require("./modules/master/master.routes");
const activityRoutes = require("./modules/activity/activity.route")

const errorMiddleware = require("./middlewares/err.middleware");

const app = express();

const path = require("path");
app.use("/uploads", express.static(path.resolve("src/uploads")));

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.json({ success: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/masters", masterRoutes);

app.use(errorMiddleware);

module.exports = app;
