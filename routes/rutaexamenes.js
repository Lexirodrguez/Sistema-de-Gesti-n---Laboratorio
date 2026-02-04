const express = require("express");
const router = express.Router();
const examenesControlador = require("../controladores/examenesControlador");

router.get("/", async (req, res) => {
    const examenes = await examenesControlador.todos();
    res.json({ mensaje: "Examenes obtenidos con éxito", datos: examenes });
});

router.get("/:id", async (req, res) => {
    const examen = await examenesControlador.buscarporId(req.params.id);
    if (examen) {
        res.json(examen);
    } else {
        res.status(404).json({ error: "Examen no encontrado" });
    }
});

router.post("/", async (req, res) => {
    const examenCreado = await examenesControlador.crear(req.body);
    if (examenCreado) {
        res.status(201).json({
            mensaje: "Examen creado con éxito",
            datos: examenCreado
        });
    } else {
        res.status(400).json({ error: "Datos inválidos" });
    }
});

router.put("/:id", async (req, res) => {
    const examenActualizado = await examenesControlador.actualizar(req.params.id, req.body);
    if (examenActualizado) {
        res.json({ mensaje: "Examen actualizado", datos: examenActualizado });
    } else {
        res.status(400).json({ error: "Datos inválidos o ID no encontrado" });
    }
});

router.delete("/:id", async (req, res) => {
    const eliminado = await examenesControlador.eliminar(req.params.id);
    if (eliminado) {
        res.json({ mensaje: "Examen eliminado con éxito" });
    } else {
        res.status(404).json({ error: "Examen no encontrado" });
    }
});

module.exports = router;