const ModeloPerfilRenal = require("../modelos/perfil_renal_modelos");

const modelo = new ModeloPerfilRenal(); 

const perfilrenalControlador = {
    guardarPerfilRenal: async (datos) => {
        return await modelo.guardarPerfilRenal(datos); 
    },
};

module.exports = perfilrenalControlador;