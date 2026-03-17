const db = require("../configuracion_bd/bd.js");

class ModeloPerfilRenal {
    guardarPerfilRenal(datos) {
        return new Promise((resolve, reject) => {
            const sqlResultado = "INSERT INTO resultados (paciente_resultados, examen_resultados, fecha_resultados) VALUES (?, ?, ?)";
            const fechaActual = new Date().toISOString().slice(0, 10);

            db.query(sqlResultado, [datos.pacienteId, datos.examenId, fechaActual], (err, res) => {
                if (err) return reject(err);


                const sqlDetalle = "INSERT INTO perfil_renal (id_paciente, albumina_orina, bun, relacion_bun_creatinina, calcio, dioxido_carbono, cloruro, cociente_urea_creatinina, tasa_filtrado_glomerular_tefg, anion_gap) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

                db.query(sqlDetalle, [datos.pacienteId, datos.albumina_orina, datos.bun, datos.relacion_bun_creatinina, datos.calcio, datos.dioxido_carbono, datos.cloruro, datos.cociente_urea_creatinina, datos.tasa_filtrado_glomerular_tefg, datos.anion_gap], (err2, res2) => {
                    if (err2) reject(err2);
                    else resolve(res2);
                });
            });
        });
    }
}

module.exports = ModeloPerfilRenal;