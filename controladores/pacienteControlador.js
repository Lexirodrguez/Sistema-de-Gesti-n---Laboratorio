const Modelopacientes = require("../modelos/paciente_modelos");

const ControladorPaciente = {
    todos: async () => {
        try {
            const pacientes = await Modelopacientes.todos();
            return { success: true, data: pacientes };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    crear: async (nuevoPaciente) => {
        try {
            // Validación básica
            if (!nuevoPaciente || !nuevoPaciente.id || !nuevoPaciente.nombre || !nuevoPaciente.apellido) {
                return { success: false, error: "Datos incompletos: se requieren id, nombre y apellido" };
            }
            const pacienteCreado = await Modelopacientes.crear(nuevoPaciente);
            return { success: true, data: pacienteCreado };
        } catch (error) {
            return { success: false, error: "Error al guardar" };
        }
    },

    eliminar: async (id) => {
        try {
            const eliminado = await Modelopacientes.eliminar(parseInt(id));
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
            const paciente = await Modelopacientes.buscarporId(parseInt(id));
            if (paciente) {
                return { success: true, data: paciente };
            } else {
                return { success: false, error: "Paciente no encontrado" };
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
            const pacienteActualizado = await Modelopacientes.actualizar(parseInt(id), actualizado);
            if (pacienteActualizado) {
                return { success: true, data: pacienteActualizado };
            } else {
                return { success: false, error: "No se pudo actualizar, ID no encontrado" };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

module.exports = ControladorPaciente;