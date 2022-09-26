const express = require("express");
const socket = require("socket.io");

const port = process.env.PORT || 4000;
const app = express();

const server = app.listen(port, () => {
  console.log("listening on port " + port);
});

app.use(express.static("public"));

// Setup socket
const io = socket(server);

io.on("connection", (socket) => {
  console.log(`made socket connection ${socket.id}`);

  // listed and handle client events
  socket.on("chat", (data) => {
    console.log(data.message);
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
