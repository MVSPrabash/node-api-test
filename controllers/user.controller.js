const { getUsers } = require('../services/user.service.js');

const getUsersController = (req, res) => {
  const users = getUsers();

  res.status(200).json({
    success: true,
    data: users
  });
};

module.exports = getUsersController;
