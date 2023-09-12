const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 7071 });

wss.on('connection', (ws) => {
  ws.send('Connected');
  ws.on('message', (message) => {
    message = JSON.parse(message);
    console.log(message);
  });
});
