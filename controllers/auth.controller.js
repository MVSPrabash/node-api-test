const {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
} = require('../services/auth.service.js');
const { ApiError } = require('../utils/ApiError.js');
const { asyncHandler } = require('../utils/asyncHandler.js');
const { UnauthorizedError } = require('../utils/errors.js');

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
    throw new UnauthorizedError("Invalid credentials");
  }

  res.status(200).json({
    success: true,
    token: result.token
  });
});

const forgotPasswordController = asyncHandler(async (req, res) => {
  const { email } = req.validated.body;

  const token = await forgotPassword(email);

  if (!token) {
    throw new ApiError(404, "User Not Found");
  }

  /// TODO: send the token via email
  res.status(200).json({
    success: true,
    message: "Password reset link sent to email",
  });
});

const resetPasswordController = asyncHandler(async (req, res) => {
  const { token, password } = req.validated.body;

  const user = await resetPassword(token, password);

  if (!user) {
    throw new ApiError(400, "Invalid or expired Token");
  }

  res.status(200).json({
    success: true,
    message: "Password updated successfully"
  });
});

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController
};

