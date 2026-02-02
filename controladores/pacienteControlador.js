const Modelopacientes = require("../modelos/paciente_modelos");

const ControladorPaciente = {
    todos: async (req, res) => {
        try {
            const pacientes = await Modelopacientes.todos();
            res.json(pacientes);
        } catch (error) {
            res.status(500).json({ error: error.mensaje });
        }
    },

    crear: async (req, res) => {
        try {
            const nuevoPaciente = req.body;
            const pacienteCreado = await Modelopacientes.crear(nuevoPaciente);
            
            res.status(201).json({
                mensaje: "Paciente creado con éxito",
                datos: pacienteCreado
            });
        } catch (error) {
            res.status(500).json({ message: "Error al guardar" });
        }
    },

    eliminar: async (req, res) => {
        try {
            const { id } = req.params;
            await Modelopacientes.eliminar(id);
            res.json({ mensaje: `Paciente eliminado con éxito` });
        } catch (error) {
            res.status(500).json({ error: error.mensaje });
        }
    },

    buscarporId: async (req, res) => {
        try {
            const { id } = req.params;
            const paciente = await Modelopacientes.buscarporId(id);

            if (paciente) {
                res.json(paciente);
            } else {
                res.status(404).json({ error: "Paciente no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.mensaje });
        }
    },

    actualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const actualizado = await Modelopacientes.actualizar(id, req.body);

            if (actualizado) {
                res.json({ mensaje: "Paciente actualizado", data: actualizado });
            } else {
                res.status(404).json({ error: "No se pudo actualizar, ID no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.mensaje });
        }
    }
};

module.exports = ControladorPaciente;