const fs = require("fs/promises");
const path = require("path");
const pathJSON = path.join(__dirname, "../datos/resultados.json");

class Modeloresultados {

    async LeerArchivo() {
        try {
            const datos = await fs.readFile(pathJSON, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            return [];
        }
    }

    async guardarArchivo(datos) {
        try {
            const comntenido = JSON.stringify(datos, null, 2);
            await fs.writeFile(pathJSON, comntenido, "utf-8");
        } catch (error) {
            return [];
        }
   }

   async todos () {
    return await this.LeerArchivo();
   }

   async buscarporId(id) {
    const resultados = await this.LeerArchivo();
    return resultados.find(r => r.id === parseInt(id));
   }

   async crear(nuevoResultado) {
    const resultados = await this.LeerArchivo();
    resultados.push(nuevoResultado);
    await this.guardarArchivo(resultados);
    return nuevoResultado;
   }
   
   async actualizar(id, resultadosActualizados) {
    try {
        const resultados = await this.LeerArchivo();
        const index = resultados.findIndex(r => r.id === parseInt(id));

        if (index === -1) return null;

        resultados[index] = {...resultados[index], ...resultadosActualizados};
        await this.guardarArchivo(resultados);
        return resultados[index];
    }catch (error) {
        return null;
    }

   }

   async eliminar (id) {
    try {
        const resultados = await this.LeerArchivo();
        const resultadosRestantes = resultados.filter(r => r.id !== id);
        await this.guardarArchivo(resultadosRestantes);
        return true;
    }catch (error) {
        return false;
    }
   }
}

module.exports = new Modeloresultados;