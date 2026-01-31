const express = require('express');
const router = express.Router();

//lista de resultados en memoria
router.get('/', (req, res) => {
    res.render("resultados", { 
        tittle: "Resultados de examanes",
        resultados: req.resultados,
        pacientes: req.pacientes,
        examanes: req.examanes,
    });
});

// Formulario para agregar un nuevo resultado    
router.get('/nuevo', (req, res) => {
    res.render("Resultado-form", {
        tittle: "Agregar nuevo resultado",
        resultado: null,
        accion: "/resultados/nuevo",
        pacientes: req.pacientes,
        examanes: req.examanes
    });
});

// procesar el formulario de nuevo resultado
router.post("/", (req, res) => {
    const paciente = req.pacientes.find(p => p.id === parseInt(req.body.pacienteId));
    const examan = req.examanes.find(e => e.id === parseInt(req.body.examanId));
    const nuevoResultado = {
        id: req.resultados.length > 0 ? Math.max (...req.resultados.map(r => r.id)) + 1 : 1,
        pacienteId: parseInt(req.body.pacienteId),
        pacienteNombre: paciente ? paciente.nombre : "Desconocido",
        examanId: parseInt(req.body.examanId),
        examanNombre: examan ? examan.nombre : "Desconocido",
        fecha:req.body.fecha || new Date().toISOString().split('T')[0],
        resultado: req.body.resultado,
        observaciones: req.body.observaciones
    };
    req.resultados.push(nuevoResultado);
    res.redirect("/resultados");
});

// eliminar un resultado
router.post('/eliminar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    req.resultados = req.resultados.filter(r => r.id !== id);
    res.redirect('/resultados');
});         

module.exports = router;
