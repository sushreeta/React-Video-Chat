const express = require("express");
const app = express();
// app.use(express.json());
// const { mongoose } = require('./config/database')
// const { userRouter } = require('./app/controller/usersController')

const port = 8006;

// app.use('/users', userRouter)

app.get("/", function(req, res) {
  // res.send('<h1>Hello world</h1>');
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
io.on("connection", socket => {
  console.log("socket connection established");
  socket.on("socketPing", ()=>{
    console.log("received socketPing, sending socketPong")
    io.emit('socketpong')
  })
})

// server.listen(port, function() {
//   console.log("listening to port", port);
//   // console.log(io)
// });
