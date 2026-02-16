const Modeloexamenes = require('../modelos/examenes_modelos');

const ControladorExamenes = {
    todos: async () => {
        const examenes = await Modeloexamenes.todos();
        return examenes;
    },

    crear: async (nuevoExamen) => {
        if (!nuevoExamen) return null;

        const payload = { 
            nombre_examenes: nuevoExamen.nombre, 
            precio_examenes: parseFloat(nuevoExamen.precio), 
            descripcion_examenes: nuevoExamen.descripcion 
        };

        const examenCreado = await Modeloexamenes.crear(payload);
        return examenCreado;
    },

    eliminar: async (id) => {
        const eliminado = await Modeloexamenes.eliminar(parseInt(id));
        return eliminado;
    },

    buscarporId: async (id) => {
        const examen = await Modeloexamenes.buscarporId(parseInt(id));
        return examen;
    },

    actualizar: async (id, nuevoExamen) => {
    if (!nuevoExamen || Object.keys(nuevoExamen).length === 0) {
        return null;
    }
        const payload = {
        nombre_examenes: nuevoExamen.nombre, 
        precio_examenes: parseFloat(nuevoExamen.precio), 
        descripcion_examenes: nuevoExamen.descripcion
        };

        const examenActualizado = await Modeloexamenes.actualizar(parseInt(id), payload);
        return examenActualizado;
    }
};

module.exports = ControladorExamenes;