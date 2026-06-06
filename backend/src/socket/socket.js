const { Server } = require("socket.io");
const AppError = require("../utils/AppError");

let io = null;

 const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("socket server connected for", socket.id);
    socket.on("disconnect", () => {
      console.log("socket server disconnected for", socket.id);
    });
  });
};

 const getIO = () => {
  if (!io) {
    new App("Socket.io is not initialized", 500);
  }

  return io;
};

module.exports = {
    initSocket, getIO
}
