const ModeloResultados = require('../modelos/resultados_modelos');

const ControladorResultados = {
    todos: async () => {
        return await ModeloResultados.todos();
    },

    crear: async (datos) => {
        if (!datos) return null;

        const pacienteId = datos.pacienteId ?? datos.pacienteid_resultados ?? datos.id_pacientes;
        const examenId = datos.examenId ?? datos.examen_resultados ?? datos.id_examenes;
        const fecha = datos.fecha ?? datos.fecha_resultados ?? null;
        const resultado = datos.resultado ?? datos.resultado_resultados ?? datos.resultado_examenes;

        if (!pacienteId || !examenId || !resultado) return null;

        const payload = {
            pacienteId: parseInt(pacienteId),
            examenId: parseInt(examenId),
            fecha,
            resultado
        };

        return await ModeloResultados.crear(payload);
    },

    buscarporId: async (id) => {
        return await ModeloResultados.buscarporId(parseInt(id));
    },

    actualizar: async (id, actualizado) => {
        if (!actualizado || Object.keys(actualizado).length === 0) {
            return null;
        }

        const payload = {};
        if (actualizado.pacienteId) payload.pacienteId = parseInt(actualizado.pacienteId);
        if (actualizado.examenId) payload.examenId = parseInt(actualizado.examenId);
        if (actualizado.fecha) payload.fecha = actualizado.fecha;
        if (actualizado.resultado) payload.resultado = actualizado.resultado;

        return await ModeloResultados.actualizar(parseInt(id), payload);
    },

    eliminar: async (id) => {
        return await ModeloResultados.eliminar(parseInt(id));
    }
};

module.exports = ControladorResultados;