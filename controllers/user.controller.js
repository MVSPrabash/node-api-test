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
  if (!req.body.name) {
    return res.status(400).json({
      success: false,
      message: "Name required"
    });
  }

  const newuser = createUser(req.body);
  res.status(201).json({
    success: true,
    data: newuser
  });
};

const getUserByIdController = (req, res) => { // GET
  const user = getUser(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
}

const updateUserController = (req, res) => { // PUT
  const user = updateUser(req.params.id, req.body);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Not found"
    });
  }
  res.status(200).json({success: true, data: user});
}

const deleteUserController = (req, res) => { // DELETE
  const deleted = deleteUser(req.params.id);
  if (!deleted) {
    res.status(404).send();
    return;
  }
  res.status(204).send();
}

module.exports = {
  getUsersController,
  createUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController
};
