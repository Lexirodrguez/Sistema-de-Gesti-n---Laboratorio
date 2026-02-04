const ModeloResultados = require("../modelos/resultados_modelos");

const ControladorResultados = {
    todos: async () => {
        const resultados = await ModeloResultados.todos();
        return resultados;
    },

    crear: async (nuevoResultado) => {
        if (!nuevoResultado || !nuevoResultado.id || !nuevoResultado.pacienteId || !nuevoResultado.examenId) {
            return null;
        }

        nuevoResultado.id = parseInt(nuevoResultado.id);
        nuevoResultado.pacienteId = parseInt(nuevoResultado.pacienteId);
        nuevoResultado.examenId = parseInt(nuevoResultado.examenId);

        const resultadoCreado = await ModeloResultados.crear(nuevoResultado);
        return resultadoCreado;
    },

    eliminar: async (id) => {
        const eliminado = await ModeloResultados.eliminar(parseInt(id));
        return eliminado;
    },

    buscarporId: async (id) => {
        const resultado = await ModeloResultados.buscarporId(parseInt(id));
        return resultado;
    },

    actualizar: async (id, actualizado) => {
        if (!actualizado || Object.keys(actualizado).length === 0) {
            return null;
        }

        if (actualizado.id) actualizado.id = parseInt(actualizado.id);
        if (actualizado.pacienteId) actualizado.pacienteId = parseInt(actualizado.pacienteId);
        if (actualizado.examenId) actualizado.examenId = parseInt(actualizado.examenId);
        
        const resultadoActualizado = await ModeloResultados.actualizar(parseInt(id), actualizado);
        return resultadoActualizado;
    }
};

module.exports = ControladorResultados;