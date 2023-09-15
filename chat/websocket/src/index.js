const express = require('express');
const path = require('path');

const app = express();

const PUBLIC_DIR_PATH = path.join(__dirname, '../public');
const PORT = 4000;

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('socket', socket);

  socket.on('join', () => {});
  socket.on('sendMessage', () => {});
  socket.on('disconnect', () => {});
});

app.use(express.static(PUBLIC_DIR_PATH));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
