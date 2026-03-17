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
};

module.exports = new ModeloUsuario();
