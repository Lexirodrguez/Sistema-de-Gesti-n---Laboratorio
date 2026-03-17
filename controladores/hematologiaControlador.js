const Modelohematologia = require("../modelos/hematologia_modelos");

const modelo = new Modelohematologia(); 

const hematologiaControlador = {
    guardarHematologia: async (datos) => {
        return await modelo.guardarHematologia(datos); 
    },
};
module.exports = hematologiaControlador;