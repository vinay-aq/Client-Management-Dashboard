import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./modules/auth/auth.routes.js";
import clientRoutes from "./modules/client/client.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import masterRoutes from "./modules/master/master.routes.js";
import activityRoutes from "./modules/activity/activity.route.js";

import errorMiddleware from "./middlewares/err.middleware.js";

const app = express();

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

export default app;