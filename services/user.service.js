const { User } = require('../models/user.model.js');

const allowedFilters = ["age", "isActive", "name"];

const getUsers = async ({ page, limit, sort, search, fields, filters }) => {
  const skip = (page - 1) * limit;

  let queryObj = {};

  if (search) {
    queryObj.name = { $regex: search, $options: "i" };
  }

  if (filters) {
    filters = Object.keys(filters)
      .filter(key => allowedFilters.includes(key))
      .reduce((obj, key) => {
        obj[key] = filters[key];
        return obj;
      }, {});

    Object.assign(queryObj, filters);
  }

  let query = User.find(queryObj);

  if (sort) {
    query = query.sort(sort);
  }

  const allowedFields = ["name", "age", "email", "isActive"];
  if (fields) {
    const selected = fields.split(",").filter(f => allowedFields.includes(f));
    const projection = selected.join(" ");
    query = query.select(projection);
  }

  const users = await query.skip(skip).limit(limit);
  const total = await User.countDocuments(queryObj);

  return { users, total, page, limit };
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

