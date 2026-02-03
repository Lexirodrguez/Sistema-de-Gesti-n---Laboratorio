const express = require("express");
const router = express.Router();
const pacienteControlador = require("../controladores/pacienteControlador");

router.get("/", pacienteControlador.todos);
router.get("/:id", pacienteControlador.buscarporId);
router.post("/", pacienteControlador.crear);
router.put("/:id", pacienteControlador.actualizar);
router.delete("/:id", pacienteControlador.eliminar);

module.exports = router;