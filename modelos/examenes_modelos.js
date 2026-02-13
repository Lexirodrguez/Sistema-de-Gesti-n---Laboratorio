const db = require("../configuracion_bd/bd.js");

class Modeloexamenes {
    
    async todos () {
        try {
            const [completo] = await db.query("SELECT * FROM examenes");
            return completo;  
        } catch (error) {
            return []
        }
    }

    async buscarporId(id) {
        try {
            const [encontrar] = await db.query("SELECT * FROM examenes WHERE id_examenes = ?", [id]);
            return encontrar.length > 0 ? encontrar[0] : null;
        } catch (error) {
            return null;
        }
    }

    async crear(examenNuevo) {
        try {
            const  {nombre_examenes, precio_examenes, descripcion_examenes } = examenNuevo;
            const [nuevo] = await db.query(
                "INSERT INTO examenes (nombre_examenes, precio_examenes, descripcion_examenes) VALUES (?, ?, ?)",
                [nombre_examenes, precio_examenes, descripcion_examenes]
            );
            return { id_examenes: nuevo.insertId, ...examenNuevo };
        } catch (error) {
            return null; 
        }
    }

    async actualizar(id, examenActualizado) {
        try {
            const [nuevo] = await db.query(
                "UPDATE examenes SET ? WHERE id_examenes = ?",
                [examenActualizado, id]
            );
            return nuevo.affectedRows > 0 ? { id_examenes: id, ...examenActualizado } : null;
            } catch (error) {
                return null;
            }
        }

        async eliminar(id) {
            try {
                const [encontrar] = await db.query("DELETE FROM examenes WHERE id_examenes = ?", [id]);
                return encontrar.affectedRows > 0;
            } catch (error) {
                return null;
            }
        }
    }

module.exports = new Modeloexamenes ();
