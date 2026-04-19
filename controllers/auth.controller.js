const {
  registerUser,
  loginUser,
  forgotPassword,
  logoutUser,
  resetPassword,
  refreshAccessToken,
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

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: false,                   // NOTE: true in production
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
  });

  res.status(200).json({
    success: true,
    accessToken: result.accessToken,
    refreshToken: result.refreshToken
  });
});

const refreshController = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies.refreshToken;

  const accessToken = await refreshAccessToken(refreshToken);

  if (!accessToken) {
    throw new ApiError(401, "Invalid Refresh token");
  }

  res.status(200).json({
    success: true,
    accessToken
  });
});

const logoutController = asyncHandler(async (req, res) => {
  await logoutUser(req.user.id);

  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: "Logged out successfully"
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
  refreshController,
  logoutController,
  forgotPasswordController,
  resetPasswordController
};

