const express = require("express");
const router = express.Router();
const resultadosControlador = require("../controladores/resultadosControlador.js");

router.get("/", async (req, res) => {
    const result = await resultadosControlador.todos();
    if (result.success) {
        res.json({ mensaje: "Resultados obtenidos con éxito", datos: result.data });
    } else {
        res.status(500).json({ error: result.error });
    }
});

router.get("/:id", async (req, res) => {
    const result = await resultadosControlador.buscarporId(req.params.id);
    if (result.success) {
        res.json(result.data);
    } else {
        res.status(result.error === "Resultado no encontrado" ? 404 : 500).json({ error: result.error });
    }
});

router.post("/nuevo", async (req, res) => {
    const result = await resultadosControlador.crear(req.body);
    if (result.success) {
        res.status(201).json({
            mensaje: "Resultado creado con éxito",
            datos: result.data
        });
    } else {
        res.status(400).json({ error: result.error });
    }
});

router.put("/:id/editar", async (req, res) => {
    const result = await resultadosControlador.actualizar(req.params.id, req.body);
    if (result.success) {
        res.json({ mensaje: "Resultado actualizado", datos: result.data });
    } else {
        res.status(result.error.includes("no encontrado") ? 404 : 400).json({ error: result.error });
    }
});

router.delete("/:id/eliminar", async (req, res) => {
    const result = await resultadosControlador.eliminar(req.params.id);
    if (result.success) {
        res.json({ mensaje: "Resultado eliminado con éxito" });
    } else {
        res.status(500).json({ error: result.error });
    }
});

module.exports = router;