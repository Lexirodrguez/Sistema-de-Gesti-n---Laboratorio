const express = require("express");
const router = express.Router();
const resultadosControlador = require("../controladores/resultadosControlador.js");
const pacientesControlador = require("../controladores/pacienteControlador.js");
const examenesControlador = require("../controladores/examenesControlador.js");
const { verificarToken, verificarRol } = require("../middleware/auth");


router.get("/", verificarToken, async (req, res) => {
    const resultados = await resultadosControlador.todos();
    const pacientes = await pacientesControlador.todos();
    const examenes = await examenesControlador.todos();

    res.render("resultados", {
        resultados,
        resultadoEditar: null,
        pacientes,
        examenes,
    });
});

router.get("/:id", verificarToken, async (req, res) => {
    const resultado = await resultadosControlador.buscarporId(req.params.id);
    const resultados = resultado ? [resultado] : [];

    res.render("resultados", { resultados: resultados, resultadoEditar: null });
});

router.post("/:id/eliminar", verificarToken, verificarRol(['bioanalista']), async (req, res) => {

    try {
        await resultadosControlador.eliminar(req.params.id);
        res.redirect("/resultados");
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar resultado" });
    }
});


module.exports = router;