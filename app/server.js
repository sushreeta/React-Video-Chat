const express = require("express");
const app = express();

const port = 8006;

const server = app.listen(port);
const io = require("socket.io")(server);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.sockets.on("connection", socket => {
  console.log("connection...")
  const log = msg => {
    const array = ["Message from server:"];
    array.push(...array, msg);
    socket.emit("log", array);
  };

  socket.on("message", message => {
    console.log("message...")
    log("Client said: ", message);
    socket.broadcast.emit("message", message);
  });

  socket.on("create or join", room => {

    
    // log("Received request to create or join room " + room);

    const clientsInRoom = io.sockets.adapter.rooms[room];
    // console.log("number of clients in room", clientsInRoom);
    const numClients = clientsInRoom
      ? Object.keys(clientsInRoom.sockets).length
      : 0;
    // log("Room " + room + " now has " + numClients + " client(s)");

    if (numClients === 0) {
      socket.join(room);
      // log("Client ID " + socket.id + " created room " + room);
      socket.emit("created", room, socket.id);
    } else if (numClients === 1) {
      // log("Client ID " + socket.id + " joined room " + room);
      io.sockets.in(room).emit("join", room);
      socket.join(room);
      socket.emit("joined", room, socket.id);
      io.sockets.in(room).emit("ready");
    } else {
      socket.emit("full", room);
    }
  });

  socket.on("event", e => {
    // socket.broadcast
    console.log("Server received msg: ", e)
    io.to(e.room).emit("event", e.message, e.name);
  });

  socket.on("bye", () => {
    console.log("received bye");
  });
});
