const { User } = require('../models/user.model.js');

const getUsers = async ({ page, limit, sort, search }) => {
  const skip = (page - 1) * limit;

  let filter = {};

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  let query = User.find(filter);
  
  if (sort) {
    query = query.sort(sort);
  }

  const users = await query.skip(skip).limit(limit);
  const total = await User.countDocuments(filter);

  return {
    users,
    total,
    page,
    limit
  };
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

