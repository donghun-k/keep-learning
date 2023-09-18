const users = [];

const addUser = ({ id, username, room }) => {
  username = username.trim();
  room = room.trim();

  if (!username || !room) {
    return {
      error: 'Username and room are required!',
    };
  }

  const existingUser = user.find((user) => {
    return user.room === room && user.username === username;
  });

  if (existingUser) {
    return {
      error: 'Username is in use!',
    };
  }

  const user = { id, username, room };

  users.push(user);
  return user;
};

const getUsersInRoom = (room) => {
  room = room.trim();
  return users.filter((user) => user.room === room);
};

module.exports = {
  addUser,
  getUsersInRoom,
};
