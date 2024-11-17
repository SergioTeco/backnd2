const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const UserDAO = require('../dao/mongo/users_dao');

// Clave secreta para JWT (usa una variable de entorno en producción)
const JWT_SECRET = 'mi_secreto';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del header Authorization
  secretOrKey: JWT_SECRET,
};

passport.use('jwt', new JwtStrategy(options, async (jwtPayload, done) => {
  try {
    // Buscar al usuario por el ID almacenado en el payload
    const user = await UserDAO.findById(jwtPayload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false, { message: 'Usuario no encontrado' });
  } catch (err) {
    return done(err, false);
  }
}));

module.exports = passport;
