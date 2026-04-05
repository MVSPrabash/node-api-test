const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} = require('../services/user.service.js');

const { asyncHandler } = require('../utils/asyncHandler.js');

const getUsersController = asyncHandler(async (req, res) => {  // GET
  let { page = 1, limit = 10, sort, search } = req.validated.query;

  page = Number(page);
  limit = Number(limit);

  const result = await getUsers({ page, limit, sort, search });
  res.status(200).json({
    success: true,
    data: result.users,
    meta: {
      page: result.page,
      limit: result.limit,
      total: result.total,
      pages: Math.ceil(result.total / result.limit)
    }
  });
});

const createUserController = asyncHandler(async (req, res) => { // POST
  const newuser = await createUser(req.validated.body);

  res.status(201).json({
    success: true,
    data: newuser
  });
});

const getUserByIdController = asyncHandler(async (req, res) => { // GET
  const requestedId = req.validated.params.id;
  const currentUserId = req.user.id;

  if (req.user.role !== 'admin' && requestedId !== currentUserId) {
    const err = new Error("Not Authorized to modify this user");
    err.status = 403;
    throw err;
  }

  const user = await getUser(requestedId);

  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    return next(err);
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

const updateUserController = asyncHandler(async (req, res) => { // PUT
  const id = req.validated.params.id;
  const updateData = req.validated.body;
  const currentUserId = req.user.id;

  if (req.user.role !== 'admin' && currentUserId !== id) {
    const err = new Error("Not Authorized to update this user");
    err.status = 403;
    throw err;
  }

  const user = await updateUser(id, updateData);
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    return next(err);
  }
  res.status(200).json({success: true, data: user});
});

const deleteUserController = asyncHandler(async (req, res, next) => { // DELETE
  const deleted = await deleteUser(req.validated.params.id);
  if (!deleted) {
    const err = new Error("User not found");
    err.status = 404;
    return next(err);
  }
  res.status(204).send();
});

const getMeController = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const user = await getUser(id);

  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }

  res.status(202).json({
    success: true,
    data: user
  });
});

const updateMeController = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const user = await updateUser(id, req.validated.body);

  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }

  res.status(202).json({
    success: true,
    data: user
  });
});

module.exports = {
  getUsersController,
  createUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  getMeController,
  updateMeController,
};
