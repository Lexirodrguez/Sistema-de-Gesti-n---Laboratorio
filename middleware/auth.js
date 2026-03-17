const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        if (req.method === 'GET') {
            return res.redirect('/auth/login');
        }
        return res.status(403).json({ mensaje: "No se proporcionó token de autenticación." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        res.clearCookie('token', { path: '/' });
        if (req.method === 'GET') {
            return res.redirect('/auth/login');
        }
        return res.status(401).json({ mensaje: "Token inválido o expirado." });
    }
};

const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).render('error', {
                message: "Acceso Denegado",
                error: { status: 403, stack: "No tienes permiso para realizar esta acción con tu rol actual (" + (req.usuario ? req.usuario.rol : 'desconocido') + ")." }
            });
        }
        next();
    };
};

module.exports = { verificarToken, verificarRol };
