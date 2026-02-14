const db = require("../configuracion_bd/bd.js");

class Modeloexamenes {
    
    todos () {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM examenes", (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado);
            });
        });
    }

    buscarporId(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM examenes WHERE id_examenes = ?", [id], (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado[0] || null );
            });
        });    
    }

    crear(examenNuevo) {
        return new Promise((resolve, reject) => {
            const { nombre_examenes, precio_examenes, descripcion_examenes } = examenNuevo;
            const sql = "INSERT INTO examenes (nombre_examenes, precio_examenes, descripcion_examenes) VALUES (?, ?, ?)";

            db.query(sql, [nombre_examenes, precio_examenes, descripcion_examenes], (error, resultado) => {
                if (error) return reject(error);
                resolve({id_examenes: resultado.insertId, ...datos});
            });
        });
    }

    actualizar(id, examenActualizado) {
        return new Promise((resolve, reject) => {
            db.query("UPDATE examenes SET ? WHERE id_examenes = ?", [id, examenActualizado], (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado.affectedRows > 0 ? {id_examenes: id, ...examenActualizado } : null);
            });
        });
    }

    eliminar(id) {
           return new Promise((resolve, reject) => {
               db.query("DELETE FROM examenes WHERE id_examenes = ?", [id], (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado.affectedRows > 0);
               });
           });
        }
    }

module.exports = new Modeloexamenes ();
