const socket = io('ws://localhost:8080');

const ulEl = document.querySelector('ul');
const inputEl = document.querySelector('input');

socket.on('message', (message) => {
  const liEl = document.createElement('li');
  liEl.textContent = message;
  ulEl.appendChild(liEl);
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const message = inputEl.value;
  socket.emit('message', message);
});
