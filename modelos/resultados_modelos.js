const db = require("../configuracion_bd/bd.js");

class Modeloresultados {

    todos() {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT r.*, p.nombre_pacientes, e.nombre_examenes 
                FROM resultados r
                JOIN pacientes p ON r.paciente_resultados = p.id_pacientes
                JOIN examenes e ON r.examen_resultados = e.id_examenes
                ORDER BY r.id_resultados DESC`;

            db.query(sql, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    eliminar(id) {
        return new Promise((resolve, reject) => {
            if (!id) return reject(new Error("ID no proporcionado"));
            db.query("DELETE FROM resultados WHERE id_resultados = ?", [id], (err, res) => {
                if (err) {
                    console.error("Error en DB delete:", err);
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }


    buscarporId(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT r.*, p.nombre_pacientes, e.nombre_examenes 
                FROM resultados r
                JOIN pacientes p ON r.paciente_resultados = p.id_pacientes
                JOIN examenes e ON r.examen_resultados = e.id_examenes
                WHERE r.id_resultados = ?`;
            db.query(sql, [id], (err, res) => {
                if (err) reject(err);
                else resolve(res[0]);
            });
        });
    }
}


module.exports = new Modeloresultados();