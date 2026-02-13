const db = require("../configuracion_bd/bd.js");

class Modelopacientes  {

    async todos() {
        try {
            const [completo] = await db.query("SELECT * FROM pacientes");
            return [completo];
        } catch (error) {
            return[];
        }
    }

    async buscarporId(id) {
     try{
        const [encontrar] = await db.query("SELECT * FROM pacientes WHERE id_pacientes = ?", [id]);
        return encontrar.length > 0 ? encontrar[0] : null;
    } catch (error) {
        return null;
        }
    }

    async crear(nuevoPaciente) {
        try {
            const { nombre_pacientes, edad_pacientes, cedula_pacientes, fechaNacimiento_pacientes } = nuevoPaciente;
            const [nuevo] = await db.query(
                "INSERT INTO pacientes (nombre_pacientes, edad_pacientes, cedula_pacientes, fechaNacimiento_pacientes) VALUES (?, ?, ?, ?)",
                [nombre_pacientes, edad_pacientes, cedula_pacientes, fechaNacimiento_pacientes]
            );
            return { id_pacientes: nuevo.insertId, ...nuevoPaciente };
        } catch (error) {
            return null;
        }
    }

    async actualizar(id, datosActualizados) {
        try { 
            const [nuevo] = await db.query(
                "UPDATE pacientes SET ? WHERE id_pacientes = ?",
                [datosActualizados, id]
            );
            return nuevo.affectedRows > 0 ? {id_pacientes: id, ...datosActualizados} : null ;
        } catch (error) {
            return null;
        }

    }

    async eliminar(id) {
        try {
            const [encontrar] = await db.query("DELETE FROM pacientes WHERE id_pacientes = ?", [id]);
            return encontrar.affectedRows > 0;
        } catch (error) {
            return null;
        }
    }

}

module.exports = new Modelopacientes();