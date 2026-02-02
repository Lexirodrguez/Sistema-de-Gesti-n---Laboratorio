const express = require("express");
const router = express.Router();
const examenesControlador = require("../controladores/examenesControlador");

router.get("/", examenesControlador.todos);
router.get("/:id", examenesControlador.buscarporId);
router.post("/nuevo", examenesControlador.crear);
router.put("/:id/editar", examenesControlador.actualizar);
router.delete("/:id/eliminar", examenesControlador.eliminar);

module.exports = router;