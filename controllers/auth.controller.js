const { registerUser, loginUser } = require('../services/auth.service.js');
const { asyncHandler } = require('../utils/asyncHandler.js');

const registerController = asyncHandler(async (req, res) => {
  const user = await registerUser(req.validated.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

const loginController = asyncHandler(async (req, res) => {
  const result = await loginUser(req.validated.body);

  if (!result) {
    const err = new Error("invalid credentials");
    err.status = 401;
    throw err;
  }

  res.status(200).json({
    success: true,
    token: result.token
  });
});

module.exports = {
  registerController,
  loginController
};

