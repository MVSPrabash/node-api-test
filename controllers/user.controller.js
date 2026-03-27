const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} = require('../services/user.service.js');

const getUsersController = (req, res) => {  // GET
  const users = getUsers();

  res.status(200).json({
    success: true,
    data: users
  });
};

const createUserController = (req, res) => { // POST
  createUser(req.body);
  res.status(201).json({success: true});
};

const getUserByIdController = (req, res) => { // GET
  const user = getUser(req.params.id);
  res.status(200).json({
    success: true,
    data: user
  });
}

const updateUserController = (req, res) => { // PUT
  updateUser(req.params.id);    // Haven't yet added any way to give what details to update
                                // Leave it for now
  res.status(200).json({success: true});
}

const deleteUserController = (req, res) => { // DELETE
  deleteUser(req.params.id);    // service contain logic, wheather if such users exists
                                // Although it can be handled using middleware, because
                                // user has to be logged in
  res.status(204).json({success: true});
}

module.exports = {
  getUsersController,
  createUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController
};
