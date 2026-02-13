const db = require("../configuracion_bd/bd.js");

class Modeloexamenes {
    
    async todos () {
        try {
            const [completo] = await db.query("SELECT * FROM examenes");
            return completo;  
        } catch (error) {
            console.error("Error al obtener examenes", error);
            return []
        }
    }

    async buscarporId(id) {
        try {
            const [filas] = await db.query("SELECT * FROM examenes WHERE id_examenes = ?", [id]);
            return filas.length > 0 ? filas[0] : null;
        } catch (error) {
            console.error("Examen no encontrado", error);
            return null;
        }
    }

    async crear(examenNuevo) {
        try {
            const  {nombre_examenes, precio_examenes, descripcion_examenes } = examenNuevo;
            const [resultado] = await db.query(
                "INSERT INTO examenes (nombre_examenes, precio_examenes, descripcion_examenes) VALUES (?, ?, ?)",
                [nombre_examenes, precio_examenes, descripcion_examenes]
            );
            return { id_examenes: resultado.insertId, ...examenNuevo };
        } catch (error) {
            console.error("Error al crear examen", error);
        }
    }

    async actualizar(id, examenActualizado) {
        try {
            const [resultado] = await db.query(
                "UPDATE examenes SET ? WHERE id_examenes = ?",
                [examenActualizado, id]
            );
            return resultado.affectedRows > 0 ? { id_examenes: id, ...examenActualizado } : null;
            } catch (error) {
                console.error("Error al actualizar examen", error);
                return null;
            }
        }

        async eliminar(id) {
            try {
                const [resultado] = await db.query("DELETE FROM examenes WHERE id_examenes = ?", [id]);
                return resultado.affectedRows > 0;
            } catch (error) {
                console.error("Error al eliminar examen", error);
                return false;
            }
        }
    }

module.exports = new Modeloexamenes;
