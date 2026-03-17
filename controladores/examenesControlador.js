const ModeloExamenes = require("../modelos/examenes_modelos");

const examenesControlador = {
    todos: async () => {
        return await ModeloExamenes.todos();
    },
    buscarporId: async (id) => {
        return await ModeloExamenes.buscarporId(id);
    },
    crear: async (datos) => {
        return await ModeloExamenes.crear(datos);
    },
    actualizar: async (id, datos) => {
        return await ModeloExamenes.actualizar(id, datos);
    },
    eliminar: async (id) => {
        return await ModeloExamenes.eliminar(id);
    },
};

module.exports = examenesControlador;