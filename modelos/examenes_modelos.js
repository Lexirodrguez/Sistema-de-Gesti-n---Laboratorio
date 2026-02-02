const e = require("express");
const fs = require("fs/promises");
const path = require("path");
const pathJSON = path.join(__dirname, "../datos/examenes.json");

class Modeloexamenes {

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
            const contenido = JSON.stringify(datos, null, 2);
            await fs.writeFile(pathJSON, contenido, "utf-8");
        } catch (error) {
            return [];
        }
    }
    
    async todos () {
        return await this.LeerArchivo();
    }

    async buscarPorId(id) {
        const examenes = await this.LeerArchivo();
        return examenes.find(e => e.id === id);
    }

    async crear(examenNuevo) {
        const examenes = await this.LeerArchivo();
        examenes.push(examenNuevo);
        await this.guardarArchivo(examanes);
        return examenNuevo;
    }

    async actualizar(id, examenActualizado) {
        try {
            const examenes = await this.LeerArchivo();
            const id = examenes.findIndex(e => e.id === id);

            if (id === -1) return null;

            examenes[id] = {...examenes[id], ...examenActualizado};

            await this.guardarArchivo(examenes);
            return examenes[id];

            } catch (error) {
                return null;
            }
        }

        async eliminar(id) {
            try {
                const examenes = await this.LeerArchivo();
                const examenesRestantes = examenes.filter(e => e.id !== id);

                await this.guardarArchivo(examenesRestantes);
                return true;
            } catch (error) {
                return false;
            }
        }
    }

module.exports = new Modeloexamenes;
