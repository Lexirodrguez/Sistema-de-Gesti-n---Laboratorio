const express = require("express");
const router = express.Router();
const pacienteControlador = require("../controladores/pacienteControlador");

router.get("/", async (req, res) => {
    const pacientes = await pacienteControlador.todos();
    res.json(pacientes);
});

router.get("/:id", async (req, res) => {
    const paciente = await pacienteControlador.buscarporId(req.params.id);
    if (paciente) {
        res.json(paciente);
    } else {
        res.status(404).json({ error: "Paciente no encontrado" });
    }
});

router.post("/nuevo", async (req, res) => {
    const pacienteCreado = await pacienteControlador.crear(req.body);
    if (pacienteCreado) {
        res.status(201).json({
            mensaje: "Paciente creado con éxito",
            datos: pacienteCreado
        });
    } else {
        res.status(400).json({ error: "Datos inválidos" });
    }
});

router.put("/:id/editar", async (req, res) => {
    const pacienteActualizado = await pacienteControlador.actualizar(req.params.id, req.body);
    if (pacienteActualizado) {
        res.json({ mensaje: "Paciente actualizado", data: pacienteActualizado });
    } else {
        res.status(400).json({ error: "Datos inválidos o ID no encontrado" });
    }
});

router.delete("/:id/eliminar", async (req, res) => {
    const eliminado = await pacienteControlador.eliminar(req.params.id);
    if (eliminado) {
        res.json({ mensaje: "Paciente eliminado con éxito" });
    } else {
        res.status(404).json({ error: "Paciente no encontrado" });
    }
});

module.exports = router;