const db = require("../configuracion_bd/bd.js");

class Modeloexamenes {

    async todos() {
        try {
            const [rows] = await db.query(
                `SELECT
                    id_examenes AS id,
                    nombre_examenes AS nombre,
                    precio_examenes AS precio,
                    descripcion_examenes AS descripcion
                FROM examenes`
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
                    id_examenes AS id,
                    nombre_examenes AS nombre,
                    precio_examenes AS precio,
                    descripcion_examenes AS descripcion
                FROM examenes WHERE id_examenes = ?`,
                [id]
            );
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            return null;
        }
    }

    async crear(examenNuevo) {
        try {
            const nombre = examenNuevo.nombre ?? examenNuevo.nombre_examenes;
            const precio = examenNuevo.precio ?? examenNuevo.precio_examenes;
            const descripcion = examenNuevo.descripcion ?? examenNuevo.descripcion_examenes ?? null;

            const [nuevo] = await db.query(
                "INSERT INTO examenes (nombre_examenes, precio_examenes, descripcion_examenes) VALUES (?, ?, ?)",
                [nombre, precio, descripcion]
            );
            const id = nuevo.insertId;
            return { id, nombre, precio, descripcion };
        } catch (error) {
            return null;
        }
    }

    async actualizar(id, examenActualizado) {
        try {
            const updateObj = {};
            if (examenActualizado.nombre) updateObj.nombre_examenes = examenActualizado.nombre;
            if (examenActualizado.precio) updateObj.precio_examenes = examenActualizado.precio;
            if (examenActualizado.descripcion) updateObj.descripcion_examenes = examenActualizado.descripcion;

            if (Object.keys(updateObj).length === 0) {
                if (examenActualizado.nombre_examenes) updateObj.nombre_examenes = examenActualizado.nombre_examenes;
                if (examenActualizado.precio_examenes) updateObj.precio_examenes = examenActualizado.precio_examenes;
                if (examenActualizado.descripcion_examenes) updateObj.descripcion_examenes = examenActualizado.descripcion_examenes;
            }

            const [res] = await db.query(
                "UPDATE examenes SET ? WHERE id_examenes = ?",
                [updateObj, id]
            );
            return res.affectedRows > 0 ? { id, ...examenActualizado } : null;
        } catch (error) {
            return null;
        }
    }

    async eliminar(id) {
        try {
            const [res] = await db.query("DELETE FROM examenes WHERE id_examenes = ?", [id]);
            return res.affectedRows > 0;
        } catch (error) {
            return null;
        }
    }
}

module.exports = new Modeloexamenes();
