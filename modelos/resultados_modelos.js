const db = require("../configuracion_bd/bd.js");

class Modeloresultados {

    todos() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM resultados", (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado);
            });
        });
    }

    buscarporId(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM resultados WHERE id_resultados = ?", [id], (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado[0] || null);
            });
        });
    }

    crear(nuevoResultado) {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO resultados SET ?", nuevoResultado, (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado);
            });
        });
    }

    actualizar(id, datosActualizados) {
        return new Promise((resolve, reject) => {
            db.query("UPDATE resultados SET ? WHERE id_resultados = ?", [datosActualizados, id], (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado.affectedRows > 0 ? { id_resultados: id, ...datosActualizados } : null);
            });
        });
    }

    eliminar(id) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM resultados WHERE id_resultados = ?", [id], (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado.affectedRows > 0);
            });
        });
    }
}

module.exports = new Modeloresultados();