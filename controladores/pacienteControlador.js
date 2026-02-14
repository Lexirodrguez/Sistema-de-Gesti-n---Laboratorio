const ModeloPacientes = require('../modelos/paciente_modelos');

const ControladorPacientes = {
    todos: async () => {
        return await ModeloPacientes.todos();
    },

    crear: async (nuevoPaciente) => {
        if (!nuevoPaciente) return null;

        const nombre = nuevoPaciente.nombre ?? nuevoPaciente.nombre_pacientes;
        const edad = nuevoPaciente.edad ?? nuevoPaciente.edad_pacientes ?? null;
        const cedula = nuevoPaciente.cedula ?? nuevoPaciente.cedula_pacientes ?? null;
        const fechaNacimiento = nuevoPaciente.fechaNacimiento ?? nuevoPaciente.fechaNacimiento_pacientes ?? null;

        if (!nombre) return null;
        const payload = { nombre, edad: edad ? parseInt(edad) : null, cedula, fechaNacimiento };
        return await ModeloPacientes.crear(payload);
    },

    buscarporId: async (id) => {
        return await ModeloPacientes.buscarporId(parseInt(id));
    },

    actualizar: async (id, actualizado) => {
        if (!actualizado || Object.keys(actualizado).length === 0) {
            return null;
        }

        const payload = {};
        if (actualizado.nombre) payload.nombre = actualizado.nombre;
        if (actualizado.edad) payload.edad = parseInt(actualizado.edad);
        if (actualizado.cedula) payload.cedula = actualizado.cedula;
        if (actualizado.fechaNacimiento) payload.fechaNacimiento = actualizado.fechaNacimiento;
        
        return await ModeloPacientes.actualizar(parseInt(id), payload);
    },

    eliminar: async (id) => {
        return await ModeloPacientes.eliminar(parseInt(id));
    }
};

module.exports = ControladorPacientes;