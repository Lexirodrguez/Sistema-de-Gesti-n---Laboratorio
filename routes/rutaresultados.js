const express = require("express");
const router = express.Router();
const resultadosControlador = require("../controladores/resultadosControlador.js");

router.get("/", resultadosControlador.todos);
router.get("/:id", resultadosControlador.buscarporId);
router.post("/nuevo", resultadosControlador.crear);
router.put("/:id/editar", resultadosControlador.actualizar);
router.delete("/:id/eliminar", resultadosControlador.eliminar);

module.exports = router;