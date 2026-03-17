const Modeloperfillipidico = require("../modelos/perfil_lipidico_modelos");

const modelo = new Modeloperfillipidico(); 

const perfillipidicoControlador = {

    guardarLipidico: async (datos) => {
        return await modelo.guardarLipidico(datos);
    },
};
module.exports = perfillipidicoControlador 