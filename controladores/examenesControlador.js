const Modeloexamenes = require('../modelos/examenes_modelos');

const ControladorExamenes = {
    todos: async () => {
        const examenes = await Modeloexamenes.todos();
        return examenes;
    },
    crear: async (nuevoExamen) => {
        if (!nuevoExamen || !nuevoExamen.id || !nuevoExamen.nombre || !nuevoExamen.descripcion) {
            return null;
        }
        const examenCreado = await Modeloexamenes.crear(nuevoExamen);
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
    actualizar: async (id, actualizado) => {
        if (!actualizado || Object.keys(actualizado).length === 0) {
            return null;
        }
        const examenActualizado = await Modeloexamenes.actualizar(parseInt(id), actualizado);
        return examenActualizado;
    }
};

module.exports = ControladorExamenes;