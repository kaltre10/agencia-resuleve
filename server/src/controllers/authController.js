const { validationResult } = require('express-validator');
const authService = require('../services/authService');

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Error de validacion',
        errors: errors.array().map((e) => e.msg),
      });
    }

    const { email, password } = req.body;
    const result = await authService.login(email, password);

    res.json({
      success: true,
      message: 'Inicio de sesion exitoso',
      data: result,
    });
  } catch (error) {
    if (error.message === 'Credenciales incorrectas' || error.message === 'Usuario desactivado') {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.verifyToken(req.user.id);
    
    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    if (error.message === 'Usuario no encontrado') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

module.exports = { login, getMe };
