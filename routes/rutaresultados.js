const express = require("express");
const router = express.Router();
const resultadosControlador = require("../controladores/resultadosControlador.js");

router.get("/", resultadosControlador.todos);
router.get("/:id", resultadosControlador.buscarporId);
router.post("/", resultadosControlador.crear);
router.put("/:id", resultadosControlador.actualizar);
router.delete("/:id", resultadosControlador.eliminar);

module.exports = router;