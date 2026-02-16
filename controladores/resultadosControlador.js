const ModeloResultados = require('../modelos/resultados_modelos');

const resultadosControlador = {
    todos: async () => {
        const resultados = await ModeloResultados.todos();
        return resultados; 
    },

    crear: async (datos) => {
        if (!datos) return null; 

        const payload = { 
            pacienteId_resultados:datos.pacienteId, 
            examen_resultados: datos.examenId,
            fecha_resultados: datos.fecha, 
            resultado_resultados: datos.resultado 
        };

        const resultadoCreado = await ModeloResultados.crear(payload); 
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

        const payload = {
            pacienteId_resultados: parseInt(actualizado.pacienteId),
            examen_resultados: parseInt(actualizado.examenId),
            fecha_resultados: actualizado.fecha,
            resultado_resultados: actualizado.resultado 
        };

        const resultadoActualizado = await ModeloResultados.actualizar(parseInt(id), payload); 
        return resultadoActualizado;
    }
};

module.exports = resultadosControlador;