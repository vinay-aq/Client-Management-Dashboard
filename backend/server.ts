import "dotenv/config";
import app from "./src/app.js";
import { initSocket } from "./src/socket/socket.js";

const port = process.env.PORT || 8000;
console.log("Node version:", process.version);

const httpServer = app.listen(port, () =>
  console.log(`Node server listening to port ${port}`),
);
initSocket(httpServer);
