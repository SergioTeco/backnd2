const express = require("express");
const session = require("express-session");
const passport = require("./config/passport"); // Estrategia local
const { connectMongoDB } = require("./config/mondoDB");
const routes = require("./routes"); // Importar las rutas desde index.js
const { Server } = require("socket.io");

require("./config/passport-local");
require("./config/passport-register");
require("./config/passport-jwt");

const app = express();

// Conexion a MongoDB
connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de sesión con estrategia local
app.use(
  session({
    secret: "secret",
    resave: true, // Mantiene la sesión activa, si esto es false, la sesión se cierra
    saveUninitialized: true, // Guarda la sesión
  })
);

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas de la API
app.use(routes);

const httpServer = app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

// Configuración de Socket.io
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo usuario Conectado");
});
