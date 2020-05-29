const express = require("express");
const config = require('../config/config');

const app = express();
const server = app.listen(config.SERVER_PORT,()=>console.log('listening at',config.SERVER_PORT));
const io = require("socket.io")(server);

module.exports =  io;
