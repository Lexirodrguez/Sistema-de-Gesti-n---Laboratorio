const express = require('express');
const router = express.Router();
const usuarioControlador = require('../controladores/usuarioControlador');
const { verificarToken, verificarRol } = require('../middleware/auth');

// Rutas de navegación

router.get('/login', usuarioControlador.showLogin);
router.get('/logout', usuarioControlador.logout);
router.post('/login', usuarioControlador.login);
router.get('/registro', verificarToken, verificarRol(['bioanalista']), usuarioControlador.mostrarRegistro);
router.post('/registro', verificarToken, verificarRol(['bioanalista']), usuarioControlador.registro);


module.exports = router;
