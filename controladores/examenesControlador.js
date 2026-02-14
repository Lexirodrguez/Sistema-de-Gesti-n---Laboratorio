const Modeloexamenes = require('../modelos/examenes_modelos');

const ControladorExamenes = {
    todos: async () => {
        const examenes = await Modeloexamenes.todos();
        return examenes;
    },

    crear: async (nuevoExamen) => {
        if (!nuevoExamen) return null;

        const nombre = nuevoExamen.nombre ?? nuevoExamen.nombre_examenes;
        const precio = nuevoExamen.precio ?? nuevoExamen.precio_examenes;
        const descripcion = nuevoExamen.descripcion ?? nuevoExamen.descripcion_examenes ?? null;

        if (!nombre || precio == null) return null;

        const payload = { nombre, precio: parseFloat(precio), descripcion };
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

    actualizar: async (id, actualizado) => {
        if (!actualizado || Object.keys(actualizado).length === 0) {
            return null;
        }

        const payload = {};
        if (actualizado.nombre) payload.nombre = actualizado.nombre;
        if (actualizado.precio) payload.precio = parseFloat(actualizado.precio);
        if (actualizado.descripcion) payload.descripcion = actualizado.descripcion;

        const examenActualizado = await Modeloexamenes.actualizar(parseInt(id), payload);
        return examenActualizado;
    }
};

module.exports = ControladorExamenes;