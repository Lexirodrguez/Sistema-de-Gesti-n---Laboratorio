const express = require("express");
const router = express.Router();
const pacienteControlador = require("../controlador/pacienteControlador");

router.get("/", pacienteControlador.todos);
router.get("/:id", pacienteControlador.buscarporId);
router.post("/nuevo", pacienteControlador.crear);
router.put("/:id/editar", pacienteControlador.actualizar);
router.delete("/:id/eliminar", pacienteControlador.eliminar);

module.exports = router;