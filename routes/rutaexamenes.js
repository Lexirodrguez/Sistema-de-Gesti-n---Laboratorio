const express = require("express");
const router = express.Router();
const examenesControlador = require("../controladores/examenesControlador");

router.get("/", async (req, res) => {
    const examenes = await examenesControlador.todos();
    res.render("examenes", { examenes, examenEditar: null }); 
});

router.get("/:id/editar", async (req, res) => {
    const examenes = await examenesControlador.todos(); 
    const examenEditar = await examenesControlador.buscarporId(req.params.id);
    if (examenEditar) {
        res.render("examenes", { examenes, examenEditar }); 
    } else {
        res.status(404).send("Examen no encontrado");
    }
});

router.post("/:id/actualizar", async (req, res) => {
    await examenesControlador.actualizar(req.params.id, req.body);
    res.redirect("/examenes"); 
});

router.post("/:id/eliminar", async (req, res) => {
    await examenesControlador.eliminar(req.params.id);
    res.redirect("/examenes");
});

router.post("/nuevo", async (req, res) => {
    await examenesControlador.crear(req.body);
    res.redirect("/examenes");
});

module.exports = router;