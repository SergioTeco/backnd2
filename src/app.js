const express = require("express");
const session = require("express-session");
const passport = require("passport"); // Usamos el passport global para las estrategias
const { connectMongoDB } = require("./config/mondoDB"); // Asegúrate de que el archivo de conexión esté bien configurado
const routes = require("./routes"); // Importamos las rutas desde index.js
const { Server } = require("socket.io");

// Importamos las estrategias de Passport
require("./config/passport-local");    // Estrategia de login con usuario/contraseña
require("./config/passport-register"); // Estrategia de registro de usuarios
require("./config/passport-jwt");      // Estrategia de autenticación JWT
require("./config/passport-current");  // Estrategia de autenticación JWT actual (token en cookies)

// Inicializamos el servidor Express
const app = express();

// Conexión a MongoDB
connectMongoDB();

// Middleware para parsear cuerpos de las solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de sesión con estrategia local
app.use(
  session({
    secret: "secret",            // Clave secreta para la sesión
    resave: false,               // No volver a guardar la sesión si no ha cambiado
    saveUninitialized: false,    // No guardar sesiones no inicializadas
  })
);

// Inicialización de Passport
app.use(passport.initialize());   // Inicializamos Passport
app.use(passport.session());      // Establecemos la sesión de Passport

// Rutas de la API
app.use(routes); // Las rutas que tienen acceso a las estrategias de autenticación

// Conexión del servidor HTTP
const httpServer = app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

// Configuración de Socket.io
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");
});
