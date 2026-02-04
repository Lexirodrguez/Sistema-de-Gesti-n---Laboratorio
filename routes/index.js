var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render("index", { title: "Sistema de Gestión de Laboratorio"});
});

const pacienteControlador = require("../controladores/pacienteControlador");
const examenesControlador = require("../controladores/examenesControlador");
const resultadosControlador = require("../controladores/resultadosControlador");


module.exports = router;
