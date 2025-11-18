const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (userData) => {
  const { username, password } = userData;
  let user = await User.findOne({ username });
  if (user) {
    throw new Error('User already exists');
  }
  user = new User({
    username,
    password,
  });
  await user.save();
  return user;
};

const loginUser = async (loginData) => {
  const { username, password } = loginData;
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  const payload = {
    user: {
      id: user.id,
    },
  };
  // Replace 'your_jwt_secret' with process.env.JWT_SECRET in a production environment
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: 3600,
  });
  return token;
};

module.exports = {
  createUser,
  loginUser,
};
