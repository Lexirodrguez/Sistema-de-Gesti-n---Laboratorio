const ModeloPacientes = require('../modelos/paciente_modelos');

const ControladorPacientes = {
    todos: async () => {
        const pacientes = await ModeloPacientes.todos();
        return pacientes;
    },

    crear: async (nuevoPaciente) => {
        if (!nuevoPaciente) return null;

        const payload = { 
            nombre_pacientes: nuevoPaciente.nombre, 
            edad_pacientes: nuevoPaciente.edad, 
            cedula_pacientes: nuevoPaciente.cedula,
            fechaNacimiento_pacientes: nuevoPaciente.fechaNacimiento 
        };

        const pacienteCreado = await ModeloPacientes.crear(payload);
        return pacienteCreado;
    },

    eliminar: async (id) => {
        const eliminado = await ModeloPacientes.eliminar(parseInt(id));
        return eliminado;
    },

    buscarporId: async (id) => {
        const paciente = await ModeloPacientes.buscarporId(parseInt(id));
        return paciente;
    },

    actualizar: async (id, actualizado) => {
        if (!actualizado || Object.keys(actualizado).length === 0) {
            return null;
        }

        const payload = {
            nombre_pacientes: actualizado.nombre, 
            edad_pacientes: actualizado.edad ? parseInt(actualizado.edad) : null, 
            cedula_pacientes: actualizado.cedula,
            fechaNacimiento_pacientes: actualizado.fechaNacimiento
        };

        const pacienteActualizado = await ModeloPacientes.actualizar(parseInt(id), payload);
        return pacienteActualizado;
    }
};

module.exports = ControladorPacientes;