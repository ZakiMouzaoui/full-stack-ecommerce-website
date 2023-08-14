// socket.js
const socketIO = require("socket.io");

let io; // Socket.io server instance

const initSocketServer = (server) => {
  io = socketIO(server);

  io.on("connection", (socket) => {
    console.log("A new client connected");
    // Additional logic for handling client connections (if needed)
  });

  return io;
};

const getSocketIOInstance = () => {
  if (!io) {
    throw new Error("Socket.io server has not been initialized.");
  }
  return io;
};

module.exports = {
  initSocketServer,
  getSocketIOInstance,
};
