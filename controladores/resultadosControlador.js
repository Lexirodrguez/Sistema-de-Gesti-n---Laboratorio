const ModeloResultados = require('../modelos/resultados_modelos');

const ControladorResultados = {
    todos: async () => {
        return await ModeloResultados.todosConDetalles();
    },

    crear: async (datos) => {
        if (!datos || !datos.id_pacientes || !datos.id_examenes || !datos.resultado_examenes) {
            return null;
        }
        
        datos.id_pacientes = parseInt(datos.id_pacientes);
        datos.id_examenes = parseInt(datos.id_examenes);

        return await ModeloResultados.crear(datos);
    },

    buscarporId: async (id) => {
        return await ModeloResultados.buscarporId(parseInt(id));
    },

    actualizar: async (id, actualizado) => {
        if (!actualizado || Object.keys(actualizado).length === 0) {
            return null;
        }

        if (actualizado.id_pacientes) actualizado.id_pacientes = parseInt(actualizado.id_pacientes);
        if (actualizado.id_examenes) actualizado.id_examenes = parseInt(actualizado.id_examenes);

        return await ModeloResultados.actualizar(parseInt(id), actualizado);
    },

    eliminar: async (id) => {
        return await ModeloResultados.eliminar(parseInt(id));
    }
};

module.exports = ControladorResultados;