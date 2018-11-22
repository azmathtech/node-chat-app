require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath)); //middleware

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    // socket.leave('The Office fans');

    // io.emit -> io.to('The Office fans').emit
    // socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
    // socket.emit

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit(
      'newMessage',
      generateMessage('Admin', 'Welcome to the chat app')
    );

    socket.broadcast
      .to(params.room)
      .emit(
        'newMessage',
        generateMessage('Admin', `${params.name} has joined.`)
      );

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    //console.log('createMessage', message);
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io
        .to(user.room)
        .emit('newMessage', generateMessage(user.name, message.text));
    }

    callback('This is from the server.');
  });

  socket.on('createLocationMessage', coords => {
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        'newLocationMessage',
        // generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`)
        generateLocationMessage(user.name, coords.latitude, coords.longitude)
      );
    }
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io
        .to(user.room)
        .emit(
          'newMessage',
          generateMessage('Admin', `${user.name} has left the room`)
        );
    }
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
