const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', () => { console.log('socket connection established')});
server.listen(3000);