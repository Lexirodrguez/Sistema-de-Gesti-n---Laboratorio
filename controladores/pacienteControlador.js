const Modelopacientes = require("../modelos/paciente_modelos");

const ControladorPaciente = {
    todos: async () => {
        const pacientes = await Modelopacientes.todos();
        return pacientes;
    },

    crear: async (nuevoPaciente) => {
        if (!nuevoPaciente || !nuevoPaciente.id || !nuevoPaciente.nombre || !nuevoPaciente.edad) {
            return null;
        }
        nuevoPaciente.id = parseInt(nuevoPaciente.id);
        nuevoPaciente.edad = parseInt(nuevoPaciente.edad);
        nuevoPaciente.cedula = parseInt(nuevoPaciente.cedula);

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
        if(actualizado.id) actualizado.id = parseInt(actualizado.id);
        if(actualizado.edad) actualizado.edad = parseInt(actualizado.edad);
        if(actualizado.cedula) actualizado.cedula = parseInt(actualizado.cedula);
        
        const pacienteActualizado = await Modelopacientes.actualizar(parseInt(id), actualizado);
        return pacienteActualizado;
    }
};

module.exports = ControladorPaciente;