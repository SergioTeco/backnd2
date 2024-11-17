const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const UserDAO = require('../dao/mongo/users_dao'); // DAO para obtener el usuario de la base de datos
const cookieParser = require('cookie-parser');

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    // Usamos un extractor personalizado para obtener el token desde la cookie
    (req) => {
      if (req && req.cookies) {
        return req.cookies['token'];  // Asegúrate de que el token se guarde en la cookie con el nombre 'token'
      }
      return null;
    }
  ]),
  secretOrKey: 'tu_clave_secreta', // La misma clave que usas para firmar el JWT
  algorithms: ['HS256'], // Algoritmo de la firma
};

// Estrategia "current" para obtener el usuario a partir del JWT en la cookie
passport.use('current', new Strategy(opts, async (jwtPayload, done) => {
  try {
    // Buscar al usuario utilizando el ID que viene del JWT
    const user = await UserDAO.findById(jwtPayload.id);
    if (!user) {
      return done(null, false, { message: 'Usuario no encontrado' });
    }

    // Si el usuario existe, lo devolvemos en el payload
    return done(null, { id: user._id, email: user.email, first_name: user.first_name, last_name: user.last_name });
  } catch (err) {
    return done(err, false, { message: 'Error al verificar el token' });
  }
}));

module.exports = passport;
