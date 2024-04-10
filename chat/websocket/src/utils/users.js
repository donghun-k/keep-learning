const users = [];

const addUser = ({ id, username, room }) => {
  username = username.trim();
  room = room.trim();

  if (!username || !room) {
    return {
      error: 'Username and room are required!',
    };
  }

  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  if (existingUser) {
    return {
      error: 'Username is in use!',
    };
  }

  const user = { id, username, room };
  console.log('user', user);

  users.push(user);
  return { user };
};

const getUsersInRoom = (room) => {
  room = room.trim();
  return users.filter((user) => user.room === room);
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

module.exports = {
  addUser,
  getUsersInRoom,
  getUser,
  removeUser,
};
