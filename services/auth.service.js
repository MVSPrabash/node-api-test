const bcrypt = require('bcrypt');
const { User } = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendEmail } = require("../utils/email.js");

const registerUser = async (data) => {
  const { name, email, age, password } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    age,
    password: hashedPassword
  });

  return await user.save();
};

const loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return null;

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.SECRETKEY,
    { expiresIn: "1h" }
  );

  return { user, token };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) return null;

  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  await user.save();

  const resetURL = `${process.env.CLIENT_URL}/api/auth/reset-password?token=${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: "Password Reset Request",
    html: `
      <h2>Password Reset</h2>
      <p>Click below to reset your password</p>
      <a href="${resetURL}">${resetURL}</a>
      <p>This link expires in 10 minutes.</p>
    `
  });

  return true;
}

const resetPassword = async (token, newPassword) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex")
  ;

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() }
  }).select("+password");

  if (!user) return null;

  user.password = await bcrypt.hash(newPassword, 10);

  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return user;
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword
};

