const Modeloexamenes = require('../modelos/examenes');

const ControladorExamenes = {
    todos: async (req, res) => {
        try {
            const examenes = await Modeloexamenes.todos();
            res.json({ mensaje: "Examenes obtenidos con éxito", datos: examenes });
        } catch (error) {
            res.status(500).json({ error: error.mensaje });
        }
    },
    crear: async (req, res) => {
        try {
            const nuevoExamen = req.body;
            const examenCreado = await Modeloexamenes.crear(nuevoExamen);

            res.status(201).json({
                mensaje: "Examen creado con éxito",
                datos: examenCreado
            });
        } catch (error) {
            res.status(500).json({ meensaje: "Error al guardar" });
        }
    },
    eliminar: async (req, res) => {
        try {
            const { id } = req.params;
            await Modeloexamenes.eliminar(id);
            res.json({ mensaje: `Examen eliminado con éxito` });
        } catch (error) {
            res.status(500).json({ error: error.mensaje });
        }   
    },
    buscarporId: async (req, res) => {
        try {
            const { id } = req.params;
            const examen = await Modeloexamenes.buscarporId(id);    
            if (examen) {
                res.json(examen);
            } else {
                res.status(404).json({ error: "Examen no encontrado" });
            } 
        } catch (error) {
            res.status(500).json({ error: error.mensaje });
        }  
    },
    actualizar: async (req, res) => {
        try {   
            const { id } = req.params;
            const actualizado = await Modeloexamenes.actualizar(id, req.body);
            if (actualizado) {
                res.json({ mensaje: "Examen actualizado", datos: actualizado });
            } else {
                res.status(404).json({ error: "No se pudo actualizar, ID no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.mensaje });
        }
    }
};  

module.exports = ControladorExamenes;