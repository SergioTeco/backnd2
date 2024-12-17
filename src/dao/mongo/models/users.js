const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10; // Define cuántas rondas de salado usar para bcrypt

// Define el esquema del usuario
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Solo 'user' o 'admin'
    default: 'user'
  }
});

// Middleware `pre` para hashear el password antes de guardar
userSchema.pre('save', function (next) {
  const user = this;

  // Solo hashear la contraseña si ha sido modificada o es nueva
  if (!user.isModified('password')) return next();

  try {
    // Hashear la contraseña
    user.password = bcrypt.hashSync(user.password, SALT_ROUNDS);
    next();
  } catch (err) {
    next(err);
  }
});

// Método para verificar la contraseña ingresada con la almacenada
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

// Crear el modelo
const User = mongoose.model('User', userSchema);

module.exports = User;
