const express = require('express');
const { body } = require('express-validator');
const { login, getMe } = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email invalido'),
    body('password').isLength({ min: 6 }).withMessage('La contrasena debe tener al menos 6 caracteres'),
  ],
  login
);

router.get('/me', authMiddleware, getMe);

module.exports = router;
