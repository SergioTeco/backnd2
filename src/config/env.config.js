const dotenv = require('dotenv'); // Usamos require para importar dotenv

dotenv.config(); // Cargamos las variables de entorno

module.exports = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  //SECRET_KEY: process.env.SECRET_KEY,
  //JWT_KEY: process.env.JWT_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  APP_SESSION_SECRET: process.env.APP_SESSION_SECRET,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
};
