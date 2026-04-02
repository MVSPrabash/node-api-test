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

const getUserByIdController = (req, res, next) => { // GET
  const user = getUser(req.validatedData.id);

  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    return next(err);
  }

  res.status(200).json({
    success: true,
    data: user
  });
}

const updateUserController = (req, res, next) => { // PUT
  const id = req.validatedData.id;
  const updateData = req.validatedData;
  const user = updateUser(id, updateData);
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    return next(err);
  }
  res.status(200).json({success: true, data: user});
}

const deleteUserController = (req, res, next) => { // DELETE
  const deleted = deleteUser(req.validatedData.id);
  if (!deleted) {
    const err = new Error("User not found");
    err.status = 404;
    return next(err);
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
