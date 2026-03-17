const ModeloResultados = require('../modelos/resultados_modelos');

const resultadosControlador = {
    todos: async () => {
        const resultados = await ModeloResultados.todos();
        return resultados; 
    },

    eliminar: async (id) => {
        const eliminado = await ModeloResultados.eliminar(parseInt(id)); 
        return eliminado; 
    },

    buscarporId: async (id) => {
        const resultado = await ModeloResultados.buscarporId(parseInt(id)); 
        return resultado; 
    },
};

module.exports = resultadosControlador;