const ModeloUsuario = require('../modelos/usuario_modelos');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const usuarioControlador = {
    showLogin: (req, res) => {
        if (req.cookies.token) {
            try {
                jwt.verify(req.cookies.token, process.env.JWT_SECRET);
                return res.redirect('/pacientes');
            } catch (e) {
                res.clearCookie('token', { path: '/' });
            }
        }

        res.render('login', { error: null });
    },


    login: async (req, res) => {
        const { nombre, password } = req.body;

        if (!nombre || !password) {
            return res.render('login', { error: "Usuario y contraseña son obligatorios." });
        }

        try {
            const usuario = await ModeloUsuario.buscarPorNombre(nombre);
            if (!usuario) {
                return res.render('login', { error: "Credenciales inválidas." });
            }

            const passwordValido = await bcrypt.compare(password, usuario.password_usuario);
            if (!passwordValido) {
                return res.render('login', { error: "Credenciales inválidas." });
            }

            const token = jwt.sign(
                { id: usuario.id_usuario, nombre: usuario.nombre_usuario, rol: usuario.rol_usuario },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000, // 24 horas
                path: '/'
            });


            res.redirect('/pacientes');
        } catch (error) {
            res.render('login', { error: "Error en el servidor: " + error.message });
        }
    },

    logout: (req, res) => {
        res.clearCookie('token', { path: '/' });
        res.redirect('/auth/login');
    },
};

module.exports = usuarioControlador;
