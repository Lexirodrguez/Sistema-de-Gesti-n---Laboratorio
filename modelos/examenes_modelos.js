const db = require("../configuracion_bd/bd.js");

class Modeloexamenes {
<<<<<<< HEAD
    
    todos () {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM examenes", (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado);
            });
        });
    }

    buscarporId(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM examenes WHERE id_examenes = ?", [id], (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado[0] || null );
            });
        });    
    }

    crear(examenNuevo) {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO examenes SET ?", examenNuevo, (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado);
            });
        });
    }

    actualizar(id, examenActualizado) {
        return new Promise((resolve, reject) => {
            db.query("UPDATE examenes SET ? WHERE id_examenes = ?", [id, examenActualizado], (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado.affectedRows > 0 ? {id_examenes: id, ...examenActualizado } : null);
            });
        });
    }

    eliminar(id) {
           return new Promise((resolve, reject) => {
               db.query("DELETE FROM examenes WHERE id_examenes = ?", [id], (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado.affectedRows > 0);
               });
           });
        }
}

module.exports = new Modeloexamenes ();
=======

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
>>>>>>> d390dc09f8796b5fb8f1451f833a82634b4e3b8a
