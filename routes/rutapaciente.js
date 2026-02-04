const express = require("express");
const router = express.Router();
const pacienteControlador = require("../controladores/pacienteControlador");

router.get("/", async (req, res) => {
    const result = await pacienteControlador.todos();
    if (result.success) {
        res.json(result.data);
    } else {
        res.status(500).json({ error: result.error });
    }
});

router.get("/:id", async (req, res) => {
    const result = await pacienteControlador.buscarporId(req.params.id);
    if (result.success) {
        res.json(result.data);
    } else {
        res.status(result.error === "Paciente no encontrado" ? 404 : 500).json({ error: result.error });
    }
});

router.post("/nuevo", async (req, res) => {
    const result = await pacienteControlador.crear(req.body);
    if (result.success) {
        res.status(201).json({
            mensaje: "Paciente creado con éxito",
            datos: result.data
        });
    } else {
        res.status(400).json({ error: result.error });
    }
});

router.put("/:id/editar", async (req, res) => {
    const result = await pacienteControlador.actualizar(req.params.id, req.body);
    if (result.success) {
        res.json({ mensaje: "Paciente actualizado", data: result.data });
    } else {
        res.status(result.error.includes("no encontrado") ? 404 : 400).json({ error: result.error });
    }
});

router.delete("/:id/eliminar", async (req, res) => {
    const result = await pacienteControlador.eliminar(req.params.id);
    if (result.success) {
        res.json({ mensaje: "Paciente eliminado con éxito" });
    } else {
        res.status(500).json({ error: result.error });
    }
});

module.exports = router;