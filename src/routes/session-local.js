const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
require('../config/passport'); // Estrategia Local (Login)
require('../config/passport-register'); // Estrategia de Registro
const UserDAO = require('../dao/user_dao');

const router = express.Router();

// Ruta de registro
router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password, age } = req.body;

  try {
    const existingUser = await UserDAO.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      age,
    });

    const savedUser = await UserDAO.createUser(newUser);
    res.status(201).json({ message: 'Usuario registrado exitosamente' , user: savedUser});
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
});

// Ruta de inicio de sesión
router.post('/login', passport.authenticate('local', {
  successRedirect: '/auth/profile',
  failureRedirect: '/auth/login',
  failureFlash: true,
}));

// Ruta de perfil (solo accesible si el usuario ha iniciado sesión)
router.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/auth/login');
    }
    res.json({
      message: 'Bienvenido a tu perfil',
      user: req.user, // Los datos del usuario autenticado
    });
  });
  
module.exports = router;
