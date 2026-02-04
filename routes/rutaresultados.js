const express = require("express");
const router = express.Router();
const resultadosControlador = require("../controladores/resultadosControlador.js");

router.get("/", async (req, res) => {
    const resultados = await resultadosControlador.todos();
    res.json({ mensaje: "Resultados obtenidos con éxito", datos: resultados });
});

router.get("/:id", async (req, res) => {
    const resultado = await resultadosControlador.buscarporId(req.params.id);
    if (resultado) {
        res.json(resultado);
    } else {
        res.status(404).json({ error: "Resultado no encontrado" });
    }
});

router.post("/nuevo", async (req, res) => {
    const resultadoCreado = await resultadosControlador.crear(req.body);
    if (resultadoCreado) {
        res.status(201).json({
            mensaje: "Resultado creado con éxito",
            datos: resultadoCreado
        });
    } else {
        res.status(400).json({ error: "Datos inválidos" });
    }
});

router.put("/:id/editar", async (req, res) => {
    const resultadoActualizado = await resultadosControlador.actualizar(req.params.id, req.body);
    if (resultadoActualizado) {
        res.json({ mensaje: "Resultado actualizado", datos: resultadoActualizado });
    } else {
        res.status(400).json({ error: "Datos inválidos o ID no encontrado" });
    }
});

router.delete("/:id/eliminar", async (req, res) => {
    const eliminado = await resultadosControlador.eliminar(req.params.id);
    if (eliminado) {
        res.json({ mensaje: "Resultado eliminado con éxito" });
    } else {
        res.status(404).json({ error: "Resultado no encontrado" });
    }
});

module.exports = router;