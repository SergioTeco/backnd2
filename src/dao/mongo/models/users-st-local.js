const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Importar el modelo de usuario
const User = mongoose.model('User', userSchema);

// Configuración de la estrategia local
passport.use('local', new LocalStrategy(
  {
    usernameField: 'email', // Usaremos el campo 'email' como nombre de usuario
    passwordField: 'password', // El campo de contraseña
  },
  async (email, password, done) => {
    try {
      // Buscar al usuario por email
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }

      // Comparar contraseñas usando bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }

      // Si todo es correcto, devolver el usuario
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Serializar usuario (guardar el ID del usuario en la sesión)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializar usuario (recuperar el usuario de la base de datos usando el ID)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
