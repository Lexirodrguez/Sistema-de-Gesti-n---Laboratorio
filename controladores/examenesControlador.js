const Modeloexamenes = require('../modelos/examenes_modelos');

const ControladorExamenes = {
    todos: async () => {
        try {
            const examenes = await Modeloexamenes.todos();
            return { success: true, data: examenes };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    crear: async (nuevoExamen) => {
        try {
            // Validación básica
            if (!nuevoExamen || !nuevoExamen.id || !nuevoExamen.nombre || !nuevoExamen.descripcion) {
                return { success: false, error: "Datos incompletos: se requieren id, nombre y descripcion" };
            }
            const examenCreado = await Modeloexamenes.crear(nuevoExamen);
            return { success: true, data: examenCreado };
        } catch (error) {
            return { success: false, error: "Error al guardar" };
        }
    },
    eliminar: async (id) => {
        try {
            const eliminado = await Modeloexamenes.eliminar(parseInt(id));
            if (eliminado) {
                return { success: true };
            } else {
                return { success: false, error: "No se pudo eliminar, ID no encontrado" };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    buscarporId: async (id) => {
        try {
            const examen = await Modeloexamenes.buscarporId(parseInt(id));
            if (examen) {
                return { success: true, data: examen };
            } else {
                return { success: false, error: "Examen no encontrado" };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    actualizar: async (id, actualizado) => {
        try {
            // Validación básica
            if (!actualizado || Object.keys(actualizado).length === 0) {
                return { success: false, error: "Datos de actualización requeridos" };
            }
            const examenActualizado = await Modeloexamenes.actualizar(parseInt(id), actualizado);
            if (examenActualizado) {
                return { success: true, data: examenActualizado };
            } else {
                return { success: false, error: "No se pudo actualizar, ID no encontrado" };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

module.exports = ControladorExamenes;