const express = require('express');

const app = express();

const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const { addUser, getUsersInRoom, getUser } = require('./utils/users');
const { generateMessage } = require('./utils/messages');
const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit(
      'message',
      generateMessage('Admin', `${user.room} 방에 오신 걸 환영합니다.`)
    );
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        generateMessage('Admin', `${user.username}가 방에 참여했습니다.`)
      );

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', generateMessage(user.username, message));
    callback();
  });
  socket.on('disconnect', () => {});
});

const PUBLIC_DIR_PATH = path.join(__dirname, '../public');
app.use(express.static(PUBLIC_DIR_PATH));

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
