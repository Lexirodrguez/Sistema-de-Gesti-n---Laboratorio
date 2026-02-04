const ModeloResultados = require("../modelos/resultados_modelos");

const ControladorResultados = {
    todos: async () => {
        try {
            const resultados = await ModeloResultados.todos();
            return { success: true, data: resultados };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    crear: async (nuevoResultado) => {
        try {
            // Validación básica
            if (!nuevoResultado || !nuevoResultado.id || !nuevoResultado.pacienteId || !nuevoResultado.examenId) {
                return { success: false, error: "Datos incompletos: se requieren id, pacienteId y examenId" };
            }
            const resultadoCreado = await ModeloResultados.crear(nuevoResultado);
            return { success: true, data: resultadoCreado };
        } catch (error) {
            return { success: false, error: "Error al guardar" };
        }
    },
    eliminar: async (id) => {
        try {
            const eliminado = await ModeloResultados.eliminar(parseInt(id));
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
            const resultado = await ModeloResultados.buscarporId(parseInt(id));
            if (resultado) {
                return { success: true, data: resultado };
            } else {
                return { success: false, error: "Resultado no encontrado" };
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
            const resultadoActualizado = await ModeloResultados.actualizar(parseInt(id), actualizado);
            if (resultadoActualizado) {
                return { success: true, data: resultadoActualizado };
            } else {
                return { success: false, error: "No se pudo actualizar, ID no encontrado" };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

module.exports = ControladorResultados;