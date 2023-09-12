const ws = new WebSocket('ws://localhost:7071/ws');

ws.onmessage = (webSocketMessage) => {
  console.log(webSocketMessage);
  console.log(webSocketMessage.data);
};

document.body.onmousemove = (event) => {
  const { clientX, clientY } = event;
  ws.send(JSON.stringify({ clientX, clientY }));
};
