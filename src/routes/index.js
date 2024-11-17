const express = require('express');
const authRoutes = require('./session-local'); // Rutas para autenticación con Passport local
const jwtAuthRoutes = require('./auth-jwt'); // Rutas para autenticación con JWT
const CurrentRouter = require('./current');

const router = express.Router();

// Definir las rutas
router.use('/auth', authRoutes); // Local: /auth/register y /auth/login
router.use('/auth-jwt', jwtAuthRoutes); // JWT: /auth-jwt/login y /auth-jwt/protected
router.use('/auth/current', CurrentRouter);

module.exports = router;