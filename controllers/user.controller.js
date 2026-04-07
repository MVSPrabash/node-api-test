const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} = require('../services/user.service.js');

const { asyncHandler } = require('../utils/asyncHandler.js');

const { UnauthorizedError, NotFoundError } = require('../utils/errors.js');

const getUsersController = asyncHandler(async (req, res) => {  // GET
  const {
    page = 1,
    limit = 10,
    sort,
    search,
    fields,
    ...rawFilters
  } = req.validated.query;

  let filters = { ...rawFilters };  // Clone filters

  let filterStr = JSON.stringify(filters);  // Convert operators to Mongo Style

  filterStr = filterStr.replace(
    /\b(gt|gte|lt|lte)\b/g,
    (match) => `$${match}`
  );

  filters = JSON.parse(filterStr);

  // type coersion
  const coerceType = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        coerceType(obj[key]);
      } else {
        if (obj[key] === "true") obj[key] = true;
        else if (obj[key] === "false") obj[key] = false;
        else if (!isNaN(obj[key])) obj[key] = Number(obj[key]);
      }
    }
  }

  coerceType(filters);

  const result = await getUsers({
    page,
    limit,
    sort,
    search,
    fields,
    filters
  });

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
    throw new UnauthorizedError("You are not authorized to get this user details");
  }

  const user = await getUser(requestedId);

  if (!user) {
    throw new NotFoundError;
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
    throw new UnauthorizedError("You are not authorized to modify this user");
  }

  const user = await updateUser(id, updateData);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  res.status(200).json({success: true, data: user});
});

const deleteUserController = asyncHandler(async (req, res, next) => { // DELETE
  const deleted = await deleteUser(req.validated.params.id);
  if (!deleted) {
    throw new NotFoundError("You are not authorized to delete this user");
  }
  res.status(204).send();
});

const getMeController = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const user = await getUser(id);

  if (!user) {
    throw new NotFoundError;
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
    throw new NotFoundError;
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
