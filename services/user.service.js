const { users } = require('../models/user.model.js');

let nextId = 1;

const getUsers = () => {
  console.log("ADMIN: Serving data of all the users");
  return users;
};

const createUser = (data) => {
  const newUser = {
    id: nextId++,
    ...data
  };
  users.push(newUser);
  console.log("New User created: ", newUser);
  return newUser;
};

const getUser = (uid) => {
  const id = Number(uid);
  console.log('Serving User details of uid:' + id);
  return users.find(u => u.id === id);
};

const updateUser = (uid, updateData) => {
  const id = Number(uid);
  const user = users.find(u => u.id === id);
  if (user) {
    Object.assign(user, updateData)
    console.log("Updated userinfo: ", user);
  }
  return user;
};

const deleteUser = (uid) => {
  const id = Number(uid);
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return false;

  console.log("user deleted: ", users[idx]);
  users.splice(idx, 1);
  return true;
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
};

