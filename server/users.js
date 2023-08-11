const allUsers = [];

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // const existingUser = allUsers.find((user) => {
  //   user.room === room && user.username === username;
  // });

  // if (existingUser) {
  //   throw new Error("Username Already Exists!");
  // }
  const user = { id, username, room };
  allUsers.push(user);

  return user;
};

const removeUser = (id) => {
  const indexOfUser = allUsers.findIndex((user) => user.id == id);

  if (indexOfUser != -1) {
    return allUsers.splice(indexOfUser, 1)[0];
  }
};

const getUser = (id) => {
  return allUsers.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
  return allUsers.filter((user) => user.room === room);
};

export { addUser, removeUser, getUser, getUsersInRoom };
