const express = require("express");
const router = express.Router();
const examenesControlador = require("../controladores/examenesControlador");

router.get("/", async (req, res) => {
    const result = await examenesControlador.todos();
    if (result.success) {
        res.json({ mensaje: "Examenes obtenidos con éxito", datos: result.data });
    } else {
        res.status(500).json({ error: result.error });
    }
});

router.get("/:id", async (req, res) => {
    const result = await examenesControlador.buscarporId(req.params.id);
    if (result.success) {
        res.json(result.data);
    } else {
        res.status(result.error === "Examen no encontrado" ? 404 : 500).json({ error: result.error });
    }
});

router.post("/", async (req, res) => {
    const result = await examenesControlador.crear(req.body);
    if (result.success) {
        res.status(201).json({
            mensaje: "Examen creado con éxito",
            datos: result.data
        });
    } else {
        res.status(400).json({ error: result.error });
    }
});

router.put("/:id", async (req, res) => {
    const result = await examenesControlador.actualizar(req.params.id, req.body);
    if (result.success) {
        res.json({ mensaje: "Examen actualizado", datos: result.data });
    } else {
        res.status(result.error.includes("no encontrado") ? 404 : 400).json({ error: result.error });
    }
});

router.delete("/:id", async (req, res) => {
    const result = await examenesControlador.eliminar(req.params.id);
    if (result.success) {
        res.json({ mensaje: "Examen eliminado con éxito" });
    } else {
        res.status(500).json({ error: result.error });
    }
});

module.exports = router;