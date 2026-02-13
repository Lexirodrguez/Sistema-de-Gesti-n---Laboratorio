const bd = require("../configuracion_bd/bd.js");

class Modeloresultados {

   async todos () {
    try {
        const [completo] = await db.query ("SELECT * FROM resultados");
        return completo; 
    } catch (error) {
        return [];
    }
   }

   async buscarporId(id) {
    try {
        const [encontrar] = await db.query("SELECT * FROM resultados WHERE id_resultados = ?", [id]);
        return encontrar.length > 0 ? encontrar [0] : null;
    } catch (error) {
        return null;
    }
   }

   async crear(nuevoResultado) {
    try {
        const { pacienteid_resultados, examen_resultados, fecha_resultados, resultado_resultados } = nuevoResultado;
        const [nuevo] = await db.query(
            "INSERT INTO resultados (pacienteid_resultados, examen_resultados, fecha_resultados, resultado_resultados) VALUES (?, ?, ?, ?)",
            [pacienteid_resultados, examen_resultados, fecha_resultados, resultado_resultados]
        );
        return { id_resultados: nuevo.insertId, ...nuevoResultado };
    } catch (error) {
        return null; 
    }

    }
   
   async actualizar(id, resultadosActualizados) {
    try {
       const [nuevo] = await db.query (
        "UPDATE resultados SET ? WHERE id_resultados =?",
        [resultadosActualizados, id]
    );
    return nuevo.affedtedRows > 0 ? { id_resultados: id, ...resultadosActualizados } : null;
    } catch (error) {
        return null;
    }
   }

   async eliminar (id) {
    try {
        const [encontrar] = await db.query("DELETE FROM resultados WHERE id_resultados = ?", [id]);
        return encontrar.affedtedRows > 0;
    } catch (error) {
        return null;
    }
   }
}

module.exports = new Modeloresultados ();