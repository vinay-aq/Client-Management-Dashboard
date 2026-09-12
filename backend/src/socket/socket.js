import { Server } from "socket.io";
import AppError from "../utils/AppError.js";

let io = null;

export const initSocket = (httpServer) => {
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

export const getIO = () => {
  if (!io) {
    throw new AppError("Socket.io is not initialized", 500);
  }

  return io;
};
