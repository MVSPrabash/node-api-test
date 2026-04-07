const bcrypt = require('bcrypt');
const { User } = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

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

module.exports = {
  registerUser,
  loginUser
};

