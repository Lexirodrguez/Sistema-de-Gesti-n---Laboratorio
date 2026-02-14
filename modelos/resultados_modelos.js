const db = require("../configuracion_bd/bd.js");

class Modeloresultados {

   async todos() {
    try {
        const [rows] = await db.query(
            `SELECT
                id_resultados AS id,
                pacienteid_resultados AS pacienteId,
                examen_resultados AS examenId,
                fecha_resultados AS fecha,
                resultado_resultados AS resultado
            FROM resultados`
        );
        return rows;
    } catch (error) {
        return [];
    }
   }

   async buscarporId(id) {
    try {
        const [rows] = await db.query(
            `SELECT
                id_resultados AS id,
                pacienteid_resultados AS pacienteId,
                examen_resultados AS examenId,
                fecha_resultados AS fecha,
                resultado_resultados AS resultado
            FROM resultados WHERE id_resultados = ?`,
            [id]
        );
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        return null;
    }
   }

   async crear(nuevoResultado) {
    try {
        const pacienteid = nuevoResultado.pacienteid_resultados ?? nuevoResultado.pacienteId ?? nuevoResultado.id_pacientes;
        const examen = nuevoResultado.examen_resultados ?? nuevoResultado.examenId ?? nuevoResultado.id_examenes;
        const fecha = nuevoResultado.fecha_resultados ?? nuevoResultado.fecha ?? null;
        const resultado = nuevoResultado.resultado_resultados ?? nuevoResultado.resultado ?? nuevoResultado.resultado_examenes ?? null;

        const [nuevo] = await db.query(
            "INSERT INTO resultados (pacienteid_resultados, examen_resultados, fecha_resultados, resultado_resultados) VALUES (?, ?, ?, ?)",
            [pacienteid, examen, fecha, resultado]
        );
        const id = nuevo.insertId;
        return { id, pacienteId: pacienteid, examenId: examen, fecha, resultado };
    } catch (error) {
        return null; 
    }

    }
   
   async actualizar(id, resultadosActualizados) {
    try {
       const updateObj = {};
       if (resultadosActualizados.pacienteId) updateObj.pacienteid_resultados = resultadosActualizados.pacienteId;
       if (resultadosActualizados.examenId) updateObj.examen_resultados = resultadosActualizados.examenId;
       if (resultadosActualizados.fecha) updateObj.fecha_resultados = resultadosActualizados.fecha;
       if (resultadosActualizados.resultado) updateObj.resultado_resultados = resultadosActualizados.resultado;

       if (Object.keys(updateObj).length === 0) {
           if (resultadosActualizados.pacienteid_resultados) updateObj.pacienteid_resultados = resultadosActualizados.pacienteid_resultados;
           if (resultadosActualizados.examen_resultados) updateObj.examen_resultados = resultadosActualizados.examen_resultados;
           if (resultadosActualizados.fecha_resultados) updateObj.fecha_resultados = resultadosActualizados.fecha_resultados;
           if (resultadosActualizados.resultado_resultados) updateObj.resultado_resultados = resultadosActualizados.resultado_resultados;
       }

       const [res] = await db.query (
        "UPDATE resultados SET ? WHERE id_resultados = ?",
        [updateObj, id]
    );
    return res.affectedRows > 0 ? { id: id, ...resultadosActualizados } : null;
    } catch (error) {
        return null;
    }
   }

   async eliminar (id) {
    try {
        const [res] = await db.query("DELETE FROM resultados WHERE id_resultados = ?", [id]);
        return res.affectedRows > 0;
    } catch (error) {
        return null;
    }
   }
}

module.exports = new Modeloresultados();