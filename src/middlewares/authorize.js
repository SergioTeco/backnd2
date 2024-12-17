// middleware/authorize.js

function isAdmin(req, res, next) {
    // Verifica si el usuario tiene el rol de administrador
    if (req.user && req.user.role === 'admin') {
      return next(); // Si es admin, permite el acceso
    } else {
      return res.status(403).json({
        message: 'Acceso denegado. Solo los administradores pueden realizar esta acción.'
      });
    }
  }
  
  function isUser(req, res, next) {
    // Verifica si el usuario tiene el rol de usuario normal
    if (req.user && req.user.role === 'user') {
      return next(); // Si es usuario, permite el acceso
    } else {
      return res.status(403).json({
        message: 'Acceso denegado. Solo los usuarios pueden agregar productos al carrito.'
      });
    }
  }
  
  module.exports = { isAdmin, isUser };
  