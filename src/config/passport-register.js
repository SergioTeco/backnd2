const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const UserDAO = require('../dao/mongo/users_dao'); // Suponiendo que tienes un DAO para interactuar con la base de datos

// Estrategia de registro
passport.use('register', new LocalStrategy(
  {
    usernameField: 'email', // Usamos 'email' como nombre de usuario
    passwordField: 'password', // Usamos 'password' para la contraseña
    passReqToCallback: true, // Permite el acceso a la solicitud (req) en el callback
  },
  async (req, email, password, done) => {
    try {
      // Verificar si el correo ya está registrado
      const existingUser = await UserDAO.findByEmail(email);
      if (existingUser) {
        return done(null, false, { message: 'El correo ya está registrado' });
      }

      // Cifrar la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el nuevo usuario
      const newUser = {
        email,
        password: hashedPassword,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
      };

      // Guardar el nuevo usuario en la base de datos
      const savedUser = await UserDAO.create(newUser);

      return done(null, savedUser); // Devuelve el usuario registrado
    } catch (err) {
      return done(err, false, { message: 'Hubo un error al registrar al usuario' });
    }
  }
));

module.exports = passport;
