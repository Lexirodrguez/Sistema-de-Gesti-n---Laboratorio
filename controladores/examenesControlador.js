const Modeloexamenes = require('../modelos/examenes_modelos');

const ControladorExamenes = {
    todos: async () => {
        const examenes = await Modeloexamenes.todos();
        return examenes;
    },

    crear: async (nuevoExamen) => {
        if (!nuevoExamen || !nuevoExamen.nombre_examenes || !nuevoExamen.precio_examenes) {
            return null;
        }
        nuevoExamen.precio_examenes = parseInt(nuevoExamen.precio_examenes);

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

        if (actualizado.precio_examenes) {
            actualizado.precio_examenes = parseInt(actualizado.precio_examenes);
        }
        
        const examenActualizado = await Modeloexamenes.actualizar(parseInt(id), actualizado);
        return examenActualizado;
    }
};

module.exports = ControladorExamenes;