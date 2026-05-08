const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./modules/auth/auth.routes");
const clientRoutes = require("./modules/client/client.routes");
const errorMiddleware = require("./middlewares/err.middleware");

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.json({ success: true });
});

app.post("/simple-login", (req, res) => {
  return res.json({
    success: true,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);

app.use(errorMiddleware);

module.exports = app;