const db = require('../configuracion_bd/bd');
const bcrypt = require('bcryptjs');

class ModeloUsuario {
    async buscarPorNombre(nombre) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM usuarios WHERE nombre_usuario = ?", [nombre], (err, res) => {
                if (err) reject(err);
                else resolve(res[0]);
            });
        });
    }

    async crear(datos) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(datos.password, salt);

        return new Promise((resolve, reject) => {
            db.query("INSERT INTO usuarios (nombre_usuario, password_usuario, rol_usuario) VALUES (?, ?, ?)",
                [datos.nombre, hash, datos.rol || 'analista'], (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                });
        });
    }
}

module.exports = new ModeloUsuario();
