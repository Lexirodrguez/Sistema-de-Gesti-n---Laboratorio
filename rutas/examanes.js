const express = require('express');
const router = express.Router();

// lista de examanes en memoria
router.get('/', (req, res) => {
    res.render("examanes", {
        tittle: "Catalogo de examanes",
        examanes: req.examanes
    });
});

// Formulario para agregar un nuevo examan    
router.get('/nuevo', (req, res) => {
    res.render("Examan-form", {
        tittle: "Agregar nuevo examan",
        examan: null,
        accion: "/examanes/nuevo"
    });
});

// procesar el formulario de nuevo examan
router.post("/", (req, res) => {
    const nuevoExaman = {
        id: req.examanes.length > 0 ? Math.max (...req.examanes.map(e => e.id)) + 1 : 1,
        nombre: req.body.nombre,
        precio: parseFloat(req.body.precio),
        detalleDelExamen: req.body.detalleExamen
    };
    req.examanes.push(nuevoExaman);
    res.redirect("/examanes");
});

// eliminar un examan
router.post             
('/eliminar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    req.examanes = req.examanes.filter(e => e.id !== id);
    res.redirect('/examanes');
}); 

module.exports = router;
