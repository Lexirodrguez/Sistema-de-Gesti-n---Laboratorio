const db = require("../configuracion_bd/bd.js");

class Modelohematologia {

    guardarHematologia(datos) {
        return new Promise((resolve, reject) => {
            const sqlResultado = "INSERT INTO resultados (paciente_resultados, examen_resultados, fecha_resultados) VALUES (?, ?, ?)";
            const fechaActual = new Date().toISOString().slice(0, 10);

            db.query(sqlResultado, [datos.pacienteId, datos.examenId, fechaActual], (err, res) => {
                if (err) return reject(err);
                const sqlDetalle = "INSERT INTO hematologia_completa (id_paciente, Recuento_globulos_blancos, Hemoglobina, Hematocrito, Recuento_plaquetas) VALUES (?, ?, ?, ?, ?)";

                db.query(sqlDetalle, [datos.pacienteId, datos.Recuento_globulos_blancos, datos.Hemoglobina, datos.Hematocrito, datos.Recuento_plaquetas], (err2, res2) => {
                    if (err2) reject(err2); else resolve(res2);
                });
            });
        });
    }

}
module.exports = Modelohematologia;