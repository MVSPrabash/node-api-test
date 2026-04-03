const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} = require('../services/user.service.js');

const getUsersController = async (req, res, next) => {  // GET
  try {
    const users = await getUsers();
   
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (err) {
    next(err);
  }
};

const createUserController = async (req, res, next) => { // POST
  try {
    const newuser = await createUser(req.validatedData);
  
    res.status(201).json({
      success: true,
      data: newuser
    });
  } catch (err) {
    next(err);
  }
};

const getUserByIdController = async (req, res, next) => { // GET
  try {
    const user = await getUser(req.validatedData.id);
  
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }
  
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
}

const updateUserController = async (req, res, next) => { // PUT
  try {
    const {id, ...updateData} = req.validatedData;
    const user = await updateUser(id, updateData);
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }
    res.status(200).json({success: true, data: user});
  } catch (err) {
    next(err);
  }
}

const deleteUserController = async (req, res, next) => { // DELETE
  try {
    const deleted = await deleteUser(req.validatedData.id);
    if (!deleted) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUsersController,
  createUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController
};
