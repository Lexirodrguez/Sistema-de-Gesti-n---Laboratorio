const express = require("express");
const router = express.Router();
const resultadosControlador = require("../controladores/resultadosControlador.js");

router.get("/", async (req, res) => {
    const resultados = await resultadosControlador.todos();
    res.render("resultados", { resultados, resultadoEditar: null }); 
});

router.get("/:id/editar", async (req, res) => {
    const resultados = await resultadosControlador.todos(); 
    const resultadoEditar = await resultadosControlador.buscarporId(req.params.id);
    if (resultadoEditar) {
        res.render("resultados", { resultados, resultadoEditar }); 
    } else {
        res.status(404).send("Resultado no encontrado");
    }
});

router.post("/:id/actualizar", async (req, res) => {
    await resultadosControlador.actualizar(req.params.id, req.body);
    res.redirect("/resultados"); 
});

router.post("/:id/eliminar", async (req, res) => {
    await resultadosControlador.eliminar(req.params.id);
    res.redirect("/resultados");
});

router.post("/nuevo", async (req, res) => {
    await resultadosControlador.crear(req.body);
    res.redirect("/resultados");
});

module.exports = router;