const express = require('express');
//import routes from "./routes/index.js";
//import __dirname from "./dirname.js";
const session = require('express-session');
const Server = require ('socket.io');
const passport = require('./config/passport'); // Estrategia local
const connectMongoDB = require ('./config/mongoDB.js');
//import session from "express-session";
//const authRoutes = require('./routes/session-local');
//const jwtAuthRoutes = require('./routes/auth-jwt'); 
require('./config/passport-local'); 
require('./config/passport-register'); 
require('./config/passport-jwt'); 
const routes = require('./routes'); // Importar las rutas desde index.js

const app = express();

//conexion a mongo
connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//config de sesion estrategia local
app.use(
  session({
    secret: APP_SESSION_SECRET,
    resave: true, // Mantiene la session activa, si esto est el false la session se cierra
    saveUninitialized: true, // Guarde la sesion
  })
);

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas de la api
//app.use('/auth', authRoutes); //se le pasa los files de ese file con todas las rutas
//app.use('/auth-jwt', jwtAuthRoutes );
app.use(routes);

const httpServer = app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

// Configuramos socket
export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo usuario Conectado");
});