const { User } = require('../models/user.model.js');

const getUsers = async () => {
  return await User.find();
};

const createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

const getUser = async (id) => {
  return await User.findById(id);
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, {
    returnDocument: 'after',
    runValidators: true
  });
};

const deleteUser = async (id) => {
  const result = await User.findByIdAndDelete(id);
  return !!result;
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
};

