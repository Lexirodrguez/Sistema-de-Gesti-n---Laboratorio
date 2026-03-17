const db = require("../configuracion_bd/bd.js");

class Modeloperfillipidico {

    guardarLipidico(datos) {
        return new Promise((resolve, reject) => {
            const sqlResultado = "INSERT INTO resultados (paciente_resultados, examen_resultados, fecha_resultados) VALUES (?, ?, ?)";
            const fechaActual = new Date().toISOString().slice(0, 10);

            db.query(sqlResultado, [datos.pacienteId, datos.examenId, fechaActual], (err, res) => {
                if (err) return reject(err);

                const sqlDetalle = "INSERT INTO perfil_lipidico (id_paciente, colesterol_total, trigliceridos, colesterol_LDL_) VALUES (?, ?, ?, ?)";

                db.query(sqlDetalle, [datos.pacienteId, datos.colesterol_total, datos.trigliceridos, datos.colesterol_LDL_], (err2, res2) => {
                    if (err2) reject(err2); else resolve(res2);
                });
            });
        });
    }

}

module.exports = Modeloperfillipidico;