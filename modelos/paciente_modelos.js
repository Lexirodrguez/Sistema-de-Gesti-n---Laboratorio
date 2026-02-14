const db = require("../configuracion_bd/bd.js");

class Modelopacientes  {

    async todos() {
        try {
            const [rows] = await db.query(
                `SELECT
                    id_pacientes AS id,
                    nombre_pacientes AS nombre,
                    edad_pacientes AS edad,
                    cedula_pacientes AS cedula,
                    fechaNacimiento_pacientes AS fechaNacimiento
                FROM pacientes`
            );
            return rows;
        } catch (error) {
            return [];
        }
    }

    async buscarporId(id) {
     try{
        const [rows] = await db.query(
            `SELECT
                id_pacientes AS id,
                nombre_pacientes AS nombre,
                edad_pacientes AS edad,
                cedula_pacientes AS cedula,
                fechaNacimiento_pacientes AS fechaNacimiento
            FROM pacientes WHERE id_pacientes = ?`,
            [id]
        );
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        return null;
        }
    }

    async crear(nuevoPaciente) {
        try {
            const nombre = nuevoPaciente.nombre ?? nuevoPaciente.nombre_pacientes;
            const edad = nuevoPaciente.edad ?? nuevoPaciente.edad_pacientes ?? null;
            const cedula = nuevoPaciente.cedula ?? nuevoPaciente.cedula_pacientes ?? null;
            const fechaNacimiento = nuevoPaciente.fechaNacimiento ?? nuevoPaciente.fechaNacimiento_pacientes ?? null;

            const [nuevo] = await db.query(
                "INSERT INTO pacientes (nombre_pacientes, edad_pacientes, cedula_pacientes, fechaNacimiento_pacientes) VALUES (?, ?, ?, ?)",
                [nombre, edad, cedula, fechaNacimiento]
            );
            const id = nuevo.insertId;
            return { id, nombre, edad, cedula, fechaNacimiento };
        } catch (error) {
            return null;
        }
    }

    async actualizar(id, datosActualizados) {
        try { 
            const updateObj = {};
            if (datosActualizados.nombre) updateObj.nombre_pacientes = datosActualizados.nombre;
            if (datosActualizados.edad) updateObj.edad_pacientes = datosActualizados.edad;
            if (datosActualizados.cedula) updateObj.cedula_pacientes = datosActualizados.cedula;
            if (datosActualizados.fechaNacimiento) updateObj.fechaNacimiento_pacientes = datosActualizados.fechaNacimiento;

            if (Object.keys(updateObj).length === 0) {
                if (datosActualizados.nombre_pacientes) updateObj.nombre_pacientes = datosActualizados.nombre_pacientes;
                if (datosActualizados.edad_pacientes) updateObj.edad_pacientes = datosActualizados.edad_pacientes;
                if (datosActualizados.cedula_pacientes) updateObj.cedula_pacientes = datosActualizados.cedula_pacientes;
                if (datosActualizados.fechaNacimiento_pacientes) updateObj.fechaNacimiento_pacientes = datosActualizados.fechaNacimiento_pacientes;
            }

            const [res] = await db.query(
                "UPDATE pacientes SET ? WHERE id_pacientes = ?",
                [updateObj, id]
            );
            return res.affectedRows > 0 ? { id, ...datosActualizados } : null ;
        } catch (error) {
            return null;
        }

    }

    async eliminar(id) {
        try {
            const [res] = await db.query("DELETE FROM pacientes WHERE id_pacientes = ?", [id]);
            return res.affectedRows > 0;
        } catch (error) {
            return null;
        }
    }

}

module.exports = new Modelopacientes();