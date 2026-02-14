const db = require("../configuracion_bd/bd.js");

class Modelopacientes  {

    todos() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM pacientes", (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado);
            });
        });
    }

    buscarporId(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM pacientes WHERE id_pacientes = ?", [id], (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado[0] || null);
            });
        });
    }

    crear(nuevoPaciente) {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO pacientes SET ?", nuevoPaciente, (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado);
            });
        });
    }

    actualizar(id, datosActualizados) {
        return new Promise((resolve, reject) => {
            db.query("UPDATE pacientes SET ? WHERE id_pacientes = ?", [datosActualizados, id], (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado.affectedRows > 0 ? { id_pacientes: id, ...datosActualizados } : null);
            });
        });
    }

    eliminar(id) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM pacientes WHERE id_pacientes = ?", [id], (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado.affectedRows > 0);
            });
        });
    }    
}

module.exports = new Modelopacientes();