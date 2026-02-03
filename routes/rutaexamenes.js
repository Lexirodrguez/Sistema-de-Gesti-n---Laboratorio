const express = require("express");
const router = express.Router();
const examenesControlador = require("../controladores/examenesControlador");

router.get("/", examenesControlador.todos);
router.get("/:id", examenesControlador.buscarporId);
router.post("/", examenesControlador.crear);
router.put("/:id", examenesControlador.actualizar);
router.delete("/:id", examenesControlador.eliminar);

module.exports = router;