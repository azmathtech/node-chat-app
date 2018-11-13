require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;
// console.log(__dirname + '/../public');
// console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); //middleware

io.on('connection', socket => {
  console.log('New user connected');

  // socket.emit('newEmail', {
  //   from: 'Mike@example.com',
  //   text: 'Hey whats up',
  //   createdAt: 123
  // });
  socket.emit('newMessage', {
    from: 'Mike',
    text: 'text message from server',
    createdAt: 1234
  });

  socket.on('createMessage', message => {
    console.log('createMessage', message);
  });

  // socket.on('createEmail', newEmail => {
  //   console.log('createEmail', newEmail);
  // });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
