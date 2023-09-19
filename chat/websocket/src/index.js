const express = require('express');
const path = require('path');

const app = express();

const PORT = 4000;

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const PUBLIC_DIR_PATH = path.join(__dirname, '../public');
app.use(express.static(PUBLIC_DIR_PATH));

io.on('connection', (socket) => {
  console.log('socket', socket);

  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit(
      'message',
      generateMessage('Admin', `${user.room}방에 오신 것을 환영합니다!`)
    );
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        generateMessage('Admin', `${user.username}님이 입장하셨습니다.`)
      );

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });
  socket.on('sendMessage', () => {});
  socket.on('disconnect', () => {});
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
