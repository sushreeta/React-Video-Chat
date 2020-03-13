const express = require("express");
const app = express();

const port = 8006;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

const server = app.listen(port)
// require("http").createServer(app);
const io = require("socket.io")(server);

// io.on("connection", socket => {
//   console.log("socket connection established");
//   socket.on("chat message", msg => {
//     io.emit("chat message", msg);
//     console.log(msg);
//   });
// });
// io.on("connection", socket => {
//   console.log("socket connection established");
//   socket.on("socketPing", ()=>{
//     console.log("received socketPing, sending socketPong")
//     io.emit('socketpong')
//   })
// })

// server.listen(port, function() {
//   console.log("listening to port", port);
//   // console.log(io)
// });

io.sockets.on("connection", function(socket) {
  // convenience function to log server messages on the client
  function log() {
    var array = ["Message from server:"];
    array.push.apply(array, arguments);
    socket.emit("log", array);
  }

  socket.on("message", function(message) {
    log("Client said: ", message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit("message", message);
  });

  socket.on("create or join", function(room) {
    log("Received request to create or join room " + room);

    var clientsInRoom = io.sockets.adapter.rooms[room];
    console.log("number of clients in room", clientsInRoom);
    var numClients = clientsInRoom
      ? Object.keys(clientsInRoom.sockets).length
      : 0;
    log("Room " + room + " now has " + numClients + " client(s)");

    if (numClients === 0) {
      socket.join(room);
      log("Client ID " + socket.id + " created room " + room);
      socket.emit("created", room, socket.id);
    } else if (numClients === 1) {
      log("Client ID " + socket.id + " joined room " + room);
      io.sockets.in(room).emit("join", room);
      socket.join(room);
      socket.emit("joined", room, socket.id);
      io.sockets.in(room).emit("ready");
    } else {
      // max two clients
      socket.emit("full", room);
    }
  });

  socket.on("bye", function() {
    console.log("received bye");
  });
});

