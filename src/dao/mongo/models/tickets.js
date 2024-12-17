const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto'); // Usaremos crypto para generar un código único

// Creamos un esquema para el Ticket
const ticketSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true, // Aseguramos que sea único
    default: function () {
      // Generamos un código único basado en un hash
      return crypto.randomBytes(8).toString('hex'); // Genera un código aleatorio único
    }
  },
  purchase_datetime: {
    type: Date,
    default: Date.now, 
  },
  amount: {
    type: Number,
    required: true, 
  },
  purchaser: {
    type: String,
    required: true, // Es obligatorio
    lowercase: true, // Convertimos a minúsculas el correo
    match: [/^\S+@\S+\.\S+$/, 'El correo debe ser válido'], // Valida que el correo sea correcto
  },
});

// Crear el modelo Ticket a partir del esquema
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
