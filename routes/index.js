var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render("index", { title: "Sistema de Gestión de Laboratorio"});
});

const pacienteControlador = require("../controladores/pacienteControlador");
const examenesControlador = require("../controladores/examenesControlador");
const resultadosControlador = require("../controladores/resultadosControlador");

router.get("/pacientes", async (req, res) => {
  const pacientes = await pacienteControlador.todos();
  res.render("pacientes", { pacientes });
});

router.get("/examenes", async (req, res) => {
  const examenes = await examenesControlador.todos();
  res.render("examenes", { examenes });
});

router.get("/resultados", async (req, res) => {
  const resultados = await resultadosControlador.todos();
  res.render("resultados", { resultados });
});

router.get("/agregar", (req, res) => {

  res.render("agregar");

});

module.exports = router;
