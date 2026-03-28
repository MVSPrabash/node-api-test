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
  const newuser = createUser(req.validatedData);

  res.status(201).json({
    success: true,
    data: newuser
  });
};

const getUserByIdController = (req, res) => { // GET
  const user = getUser(req.validatedData.id);

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
  const id = req.validatedData.id;
  const updateData = req.validatedData;
  const user = updateUser(id, updateData);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Not found"
    });
  }
  res.status(200).json({success: true, data: user});
}

const deleteUserController = (req, res) => { // DELETE
  const deleted = deleteUser(req.validatedData.id);
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
