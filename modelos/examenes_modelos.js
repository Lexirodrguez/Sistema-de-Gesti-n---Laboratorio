const db = require("../configuracion_bd/bd.js");

class Modeloexamenes {
    todos() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM examenes", (err, res) => {
                if (err) reject(err); else resolve(res);
            });
        });
    }

    buscarporId(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM examenes WHERE id_examenes = ?", [id], (err, res) => {
                if (err) reject(err); else resolve(res[0] || null);
            });
        });
    }

    crear(datos) {
        return new Promise((resolve, reject) => {
            const nombre = datos.nombre && datos.nombre.trim() !== '' ? datos.nombre.trim() : null;
            const sql = "INSERT INTO examenes (nombre_examenes, precio_examenes) VALUES (?, ?)";
            db.query(sql, [nombre || 'TEMP', datos.precio], (err, res) => {
                if (err) return reject(err);
                if (!nombre) {
                    const id = res.insertId;
                    db.query("UPDATE examenes SET nombre_examenes = ? WHERE id_examenes = ?",
                        [`Examen #${id}`, id], (err2) => {
                            if (err2) return reject(err2);
                            resolve(res);
                        });
                } else {
                    resolve(res);
                }
            });
        });
    }

    actualizar(id, datos) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE examenes SET nombre_examenes = ?, precio_examenes = ? WHERE id_examenes = ?";
            db.query(sql, [datos.nombre, datos.precio, id], (err, res) => {
                if (err) reject(err); else resolve(res);
            });
        });
    }

    eliminar(id) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM examenes WHERE id_examenes = ?", [id], (err, res) => {
                if (err) reject(err); else resolve(res);
            });
        });
    }
}

module.exports = new Modeloexamenes();