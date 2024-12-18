const mongoose = require("mongoose"); // Usamos require para mongoose
const envsConfig = require("./env.config.js"); // Usamos require para cargar el archivo de configuración

// Función para conectar a MongoDB
const connectMongoDB = async () => {
  try {
      await mongoose.connect(envsConfig.MONGO_URL); // Usamos await para esperar la conexión
      console.log("MongoDB connected");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

// Exportamos la función para que pueda ser utilizada en otros archivos
module.exports = { connectMongoDB };
