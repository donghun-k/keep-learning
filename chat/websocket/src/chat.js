const socket = io();

const query = new URLSearchParams(location.search);

const username = query.get('username');
const romm = query.get('room');

socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = '/';
  }
});

const sidebarTempate = document.querySelector('#sidebar-template').innerHTML;

socket.on('roodData', ({ room, users }) => {
  const html = Mustache.render(sidebarTempate, {
    room,
    users,
  });

  document.querySelector('#sidebar').innerHTML = html;
});
