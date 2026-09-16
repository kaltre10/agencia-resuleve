const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );
};

const login = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    throw new Error('Credenciales incorrectas');
  }

  if (!user.isActive) {
    throw new Error('Usuario desactivado');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    throw new Error('Credenciales incorrectas');
  }

  const token = generateToken(user);
  
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const verifyToken = async (userId) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  if (!user.isActive) {
    throw new Error('Usuario desactivado');
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

module.exports = { login, verifyToken };
