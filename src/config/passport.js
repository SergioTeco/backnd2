// config/passport.js
const passport = require('passport');

// Importar las estrategias
require('./passport-local');   // Estrategia local
require('./passport-register'); // Estrategia de registro
require('./passport-jwt');      // Estrategia JWT
require('./passport-current');  // Estrategia de autenticación basada en cookies (opcional)

// Exportar el passport ya configurado
module.exports = passport;
