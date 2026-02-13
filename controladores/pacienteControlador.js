const ModeloPacientes = require('../modelos/paciente_modelos');

const ControladorPacientes = {
    todos: async () => {
        return await ModeloPacientes.todos();
    },

    crear: async (nuevoPaciente) => {
        if (!nuevoPaciente || !nuevoPaciente.nombre_pacientes || !nuevoPaciente.apellido_pacientes) {
            return null;
        }
        
        if (nuevoPaciente.edad_pacientes) {
            nuevoPaciente.edad_pacientes = parseInt(nuevoPaciente.edad_pacientes);
        }

        return await ModeloPacientes.crear(nuevoPaciente);
    },

    buscarporId: async (id) => {
        return await ModeloPacientes.buscarporId(parseInt(id));
    },

    actualizar: async (id, actualizado) => {
        if (!actualizado || Object.keys(actualizado).length === 0) {
            return null;
        }

        if (actualizado.edad_pacientes) {
            actualizado.edad_pacientes = parseInt(actualizado.edad_pacientes);
        }
        
        return await ModeloPacientes.actualizar(parseInt(id), actualizado);
    },

    eliminar: async (id) => {
        return await ModeloPacientes.eliminar(parseInt(id));
    }
};

module.exports = ControladorPacientes;