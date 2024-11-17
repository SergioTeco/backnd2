const express = require('express');
const passport = require('passport');
require('../config/passport-local'); // Estrategia Local
require('../config/passport-register'); // Estrategia de Registro
require('../config/passport-jwt'); // Estrategia JWT (si la tienes)
require('../config/passport-current'); // Estrategia Current
const router = express.Router();

// Middleware para manejar cookies (si no lo tienes ya)
const cookieParser = require('cookie-parser');
router.use(cookieParser());

// Ruta para obtener los datos del usuario basado en el token de la cookie
router.get('/current', passport.authenticate('current', { session: false }), (req, res) => {
  res.json({
    message: 'Usuario autenticado con JWT',
    user: req.user, // Devuelve los datos del usuario autenticado
  });
}, (err, req, res, next) => {
    res.status(401).json({
      message: 'No autorizado',
      error: err.message || 'Error al verificar el token',
    });
  });
  
module.exports = router;
