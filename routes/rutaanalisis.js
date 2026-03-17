const express = require("express");
const router = express.Router();
const hematologiaControlador = require("../controladores/hematologiaControlador");
const perfilrenalControlador = require("../controladores/perfil_renalControlador");
const perfil_lipidicoControlador = require("../controladores/perfil_lipidicoControlador");
const pacienteControlador = require("../controladores/pacienteControlador");
const examenesControlador = require("../controladores/examenesControlador");
const { verificarToken, verificarRol } = require("../middleware/auth");

// ── Hematologia ───────────────────────────────────────────────────────────────
router.get("/hematologia", verificarToken, verificarRol(['bioanalista']), async (req, res) => {
    try {
        const pacientes = await pacienteControlador.todos();
        const examenes = await examenesControlador.todos();
        const selectedEid = req.query.eid || null;
        res.render("hematologia", { pacientes, examenes, selectedEid, usuario: req.usuario });
    } catch (error) {
        res.status(500).render("error", { message: "Error al cargar hematologia", error: { status: 500, stack: error.message } });
    }
});

router.post("/guardar-hematologia", verificarToken, verificarRol(['bioanalista']), async (req, res) => {
    try {
        await hematologiaControlador.guardarHematologia(req.body);
        res.redirect("/resultados");
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// ── Perfil Renal ──────────────────────────────────────────────────────────────
router.get("/perfil_renal", verificarToken, verificarRol(['bioanalista']), async (req, res) => {
    try {
        const pacientes = await pacienteControlador.todos();
        const examenes = await examenesControlador.todos();
        const selectedEid = req.query.eid || null;
        res.render("perfil_renal", { pacientes, examenes, selectedEid, usuario: req.usuario });
    } catch (error) {
        res.status(500).render("error", { message: "Error al cargar perfil renal", error: { status: 500, stack: error.message } });
    }
});

router.post("/guardar-perfilrenal", verificarToken, verificarRol(['bioanalista']), async (req, res) => {
    try {
        await perfilrenalControlador.guardarPerfilRenal(req.body);
        res.redirect("/resultados");
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// ── Perfil Lipidico ───────────────────────────────────────────────────────────
router.get("/perfil_lipidico", verificarToken, verificarRol(['bioanalista']), async (req, res) => {
    try {
        const pacientes = await pacienteControlador.todos();
        const examenes = await examenesControlador.todos();
        const selectedEid = req.query.eid || null;
        res.render("perfil_lipidico", { pacientes, examenes, selectedEid, usuario: req.usuario });
    } catch (error) {
        res.status(500).render("error", { message: "Error al cargar perfil lipidico", error: { status: 500, stack: error.message } });
    }
});

router.post("/guardar-lipidico", verificarToken, verificarRol(['bioanalista']), async (req, res) => {
    try {
        await perfil_lipidicoControlador.guardarLipidico(req.body);
        res.redirect("/resultados");
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;
