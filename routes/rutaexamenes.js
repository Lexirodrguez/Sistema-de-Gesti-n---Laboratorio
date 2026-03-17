const express = require("express");
const router = express.Router();
const examenesControlador = require("../controladores/examenesControlador");
const pacienteControlador = require("../controladores/pacienteControlador");
const { verificarToken, verificarRol } = require("../middleware/auth");


router.get("/", verificarToken, async (req, res) => {
    const examenes = await examenesControlador.todos();
    res.render("examenes", { examenes, examenEditar: null, usuario: req.usuario });
});


router.post("/nuevo", verificarToken, verificarRol(['bioanalista', 'secretaria']), async (req, res) => {
    try {
        await examenesControlador.crear(req.body);
        res.redirect("/examenes");
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


router.get("/:id/editar", verificarToken, verificarRol(['bioanalista', 'secretaria']), async (req, res) => {
    const examenes = await examenesControlador.todos();
    const examenEditar = await examenesControlador.buscarporId(req.params.id);
    res.render("examenes", { examenes, examenEditar, usuario: req.usuario });
});


router.post("/:id/actualizar", verificarToken, verificarRol(['bioanalista', 'secretaria']), async (req, res) => {
    try {
        await examenesControlador.actualizar(req.params.id, req.body);
        res.redirect("/examenes");
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


router.post("/:id/eliminar", verificarToken, verificarRol(['bioanalista', 'secretaria']), async (req, res) => {
    try {
        await examenesControlador.eliminar(req.params.id);
        res.redirect("/examenes");
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar examen" });
    }
});


module.exports = router;