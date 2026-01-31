const express = require('express');
const router = express.Router();

let pacientes = [];

// lista de pacientes en memoria
router.get('/', (req, res) => {
    res.render("pacientes", {
        tittle: "gestion de pacientes",
        pacientes: req.pacientes
    });
});

// agregar un nuevo paciente    
router.get('/nuevo', (req, res) => {
    res.render("Paciente-form", {
        tittle: "Agregar nuevo paciente",
        paciente: null,
        accion: "/pacientes/nuevo"
    });
});
// procesar el formulario de nuevo paciente
router.post("/", (req, res) => {
    const nuevoPaciente = {
        id: req.pacientes.length > 0 ? Math.max (...req.pacientes.map(p => p.id)) + 1 : 1,
        nombre: req.body.nombre,
        cedula: req.body.cedula,
        telefono: req.body.telefono,
        fechanacimiento: req.body.fechanacimiento,
        fecharegistro: new Date().toISOString().split('T')[0]
    };
    req.pacientes.push(nuevoPaciente);
    res.redirect("/pacientes");
});

// eliminar un paciente
router.post('/eliminar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    req.pacientes = req.pacientes.filter(p => p.id !== id);
    res.redirect('/pacientes');
}); 

module.exports = router; 