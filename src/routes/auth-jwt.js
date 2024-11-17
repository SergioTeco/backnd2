const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const UserDAO = require('../dao/mongo/users_dao');

// Configuración de JWT
const JWT_SECRET = 'mi_secreto'; // Usa variables de entorno
const JWT_EXPIRES_IN = '1h';

const router = express.Router();

// Ruta de login con generación de JWT
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por email
    const user = await UserDAO.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Generar el token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
  }
});

// Ruta protegida con estrategia JWT
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({
    message: 'Acceso autorizado',
    user: req.user,
  });
});

module.exports = router;
