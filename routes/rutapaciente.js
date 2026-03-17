const express = require("express");

const router = express.Router();
const pacienteControlador = require("../controladores/pacienteControlador");
const { verificarToken, verificarRol } = require("../middleware/auth");


router.get("/", verificarToken, async (req, res) => {
    const pacientes = await pacienteControlador.todos();
    res.render("pacientes", { pacientes, pacienteEditar: null, usuario: req.usuario });
});

router.get("/:id", verificarToken, async (req, res) => {
    const resultado = await pacienteControlador.buscarporId(req.params.id);
    const pacientes = resultado ? [resultado] : [];
    res.render("pacientes", { pacientes, pacienteEditar: null, usuario: req.usuario });
});

router.get("/:id/editar", verificarToken, verificarRol(['bioanalista']), async (req, res) => {
    const pacientes = await pacienteControlador.todos();
    const pacienteEditar = await pacienteControlador.buscarporId(req.params.id);
    if (pacienteEditar) {
        res.render("pacientes", { pacientes, pacienteEditar, usuario: req.usuario });
    } else {
        res.status(404).send("Paciente no encontrado");
    }
});

router.post("/:id/actualizar", verificarToken, verificarRol(['bioanalista']), async (req, res) => {
    try {
        await pacienteControlador.actualizar(req.params.id, req.body);
        res.redirect("/pacientes");
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


router.post("/:id/eliminar", verificarToken, verificarRol(['bioanalista']), async (req, res) => {
    try {
        await pacienteControlador.eliminar(req.params.id);
        res.redirect("/pacientes");
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar paciente" });
    }
});




router.post("/nuevo", verificarToken, async (req, res) => {
    try {
        await pacienteControlador.crear(req.body);
        res.redirect("/pacientes");
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});



module.exports = router;