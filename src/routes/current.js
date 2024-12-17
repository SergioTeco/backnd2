const express = require('express');
const passport = require('passport');
const { isAdmin, isUser } = require('../middleware/authorize'); 
require('../config/passport-local'); // Estrategia Local
require('../config/passport-register'); // Estrategia de Registro
require('../config/passport-jwt'); // Estrategia JWT (si la tienes)
require('../config/passport-current'); // Estrategia Current
const router = express.Router();

// Importa tu UserDTO
const UserDTO = require('../dto/user.dto'); // Asegúrate de que la ruta sea correcta

// Middleware para manejar cookies (si no lo tienes ya)
const cookieParser = require('cookie-parser');
router.use(cookieParser());

// Ruta para obtener los datos del usuario basado en el token de la cookie
router.get('/current', passport.authenticate('current', { session: false }), isAdmin, isUser, (req, res) => {
  // Crea una instancia de UserDTO con los datos del usuario autenticado
  const userDTO = new UserDTO(req.user);
  
  // Envía el DTO en la respuesta
  res.json({
    message: 'Usuario autenticado con JWT',
    user: userDTO, // Solo enviamos el DTO
  });
}, (err, req, res, next) => {
    res.status(401).json({
      message: 'No autorizado',
      error: err.message || 'Error al verificar el token',
    });
  });

module.exports = router;
