const Modelopacientes = require("../modelos/paciente_modelos");

const ControladorPaciente = {
    todos: async () => {
        const pacientes = await Modelopacientes.todos();
        return pacientes;
    },

    crear: async (nuevoPaciente) => {
        if (!nuevoPaciente || !nuevoPaciente.id || !nuevoPaciente.nombre || !nuevoPaciente.apellido) {
            return null;
        }
        const pacienteCreado = await Modelopacientes.crear(nuevoPaciente);
        return pacienteCreado;
    },

    eliminar: async (id) => {
        const eliminado = await Modelopacientes.eliminar(parseInt(id));
        return eliminado;
    },

    buscarporId: async (id) => {
        const paciente = await Modelopacientes.buscarporId(parseInt(id));
        return paciente;
    },

    actualizar: async (id, actualizado) => {
        if (!actualizado || Object.keys(actualizado).length === 0) {
            return null;
        }
        const pacienteActualizado = await Modelopacientes.actualizar(parseInt(id), actualizado);
        return pacienteActualizado;
    }
};

module.exports = ControladorPaciente;