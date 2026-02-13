const fs = require("fs/promises");
const path = require("path");
const pathJSON = path.join(__dirname, "../configuracion_bd/conexion_bd.php");

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

    async buscarporId(id) {
        const examenes = await this.LeerArchivo();
        return examenes.find(e => e.id === parseInt(id));
    }

    async crear(examenNuevo) {
        const examenes = await this.LeerArchivo();
        examenes.push(examenNuevo);
        await this.guardarArchivo(examenes);
        return examenNuevo;
    }

    async actualizar(id, examenActualizado) {
        try {
            const examenes = await this.LeerArchivo();
            const index = examenes.findIndex(e => e.id === parseInt(id));

            if (index === -1) return null;

            examenes[index] = {...examenes[index], ...examenActualizado};
            await this.guardarArchivo(examenes);
            return examenes[index];

            } catch (error) {
                return null;
            }
        }

        async eliminar(id) {
            try {
                const examenes = await this.LeerArchivo();
                const examenesRestantes = examenes.filter(e => e.id !== parseInt(id));

                await this.guardarArchivo(examenesRestantes);
                return true;
            } catch (error) {
                return false;
            }
        }
    }

module.exports = new Modeloexamenes;
