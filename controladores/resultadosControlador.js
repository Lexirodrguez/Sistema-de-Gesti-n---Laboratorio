const ModeloResultados = require("../modelos/resultados_modelos");

const ControladorResultados = {
    todos: async (req, res) => {
        try {
            const resultados = await ModeloResultados.todos();
            res.json({ mensaje: "Resultados obtenidos con éxito", datos: resultados });
        } catch (error) {
            res.status(500).json({ error: error.mensaje });
        }
    },
    crear: async (req, res) => {
        try {
            const nuevoResultado = req.body;
            const resultadoCreado = await ModeloResultados.crear(nuevoResultado);

            res.status(201).json({
                mensaje: "Resultado creado con éxito",
                datos: resultadoCreado
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al guardar" }); // CORREGIDO: "mensaje"
        }
    },
    eliminar: async (req, res) => {
        try {
            const { id } = req.params;
            await ModeloResultados.eliminar(id);
            res.json({ mensaje: `Resultado eliminado con éxito` });
        } catch (error) {
            res.status(500).json({ error: error.mensaje });
        }   
    },
    buscarporId: async (req, res) => {
        try {
            const { id } = req.params;
            const resultado = await ModeloResultados.buscarporId(id);    
            if (resultado) {
                res.json(resultado);
            } else {
                res.status(404).json({ error: "Resultado no encontrado" });
            } 
        } catch (error) {
            res.status(500).json({ error: error.mensaje });
        }  
    },
    actualizar: async (req, res) => {
        try {   
            const { id } = req.params;
            const actualizado = await ModeloResultados.actualizar(id, req.body);
            if (actualizado) {
                res.json({ mensaje: "Resultado actualizado", datos: actualizado });
            } else {
                res.status(404).json({ error: "No se pudo actualizar, ID no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.mensaje });
        }
    }
};  

module.exports = ControladorResultados;