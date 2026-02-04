const express = require("express");
const router = express.Router();
const pacienteControlador = require("../controladores/pacienteControlador");

router.get("/", async (req, res) => {
    const pacientes = await pacienteControlador.todos(); 
    res.render("pacientes", { pacientes, pacienteEditar: null }); 
});

router.get("/:id/editar", async (req, res) => {
    const pacientes = await pacienteControlador.todos(); 
    const pacienteEditar = await pacienteControlador.buscarporId(req.params.id);
    if (pacienteEditar) {
        res.render("pacientes", { pacientes, pacienteEditar }); 
    } else {
        res.status(404).send("Paciente no encontrado");
    }
});

router.post("/:id/actualizar", async (req, res) => {
    await pacienteControlador.actualizar(req.params.id, req.body);
    res.redirect("/pacientes"); 
});

router.post("/:id/eliminar", async (req, res) => {
    await pacienteControlador.eliminar(req.params.id);
    res.redirect("/pacientes");
});

router.post("/nuevo", async (req, res) => {
    await pacienteControlador.crear(req.body);
    res.redirect("/pacientes");
});

module.exports = router;