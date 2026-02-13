const fs = require("fs/promises");
const path = require("path");
const pathJSON = path.join(__dirname, "../configuracion_bd/conexion_bd.php");

class Modelopacientes  {

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

    async todos() {
        return await this.LeerArchivo();
    }
    

    async buscarporId(id) {
        const pacientes = await this.LeerArchivo();
        return pacientes.find(p => p.id === parseInt(id));
    }

    async crear(nuevoPaciente) {
        const pacientes = await this.LeerArchivo();
        pacientes.push(nuevoPaciente);
        await this.guardarArchivo(pacientes);
        return nuevoPaciente;
    }

    async actualizar(id, datosActualizados) {
        try {
            const pacientes = await this.LeerArchivo();
            const index = pacientes.findIndex(p => p.id === parseInt(id));

            if (index === -1) return null;

            pacientes[index] = {...pacientes[index], ...datosActualizados };
            await this.guardarArchivo(pacientes);
            return pacientes[index];
            
        } catch (error) {
            return null;
        }

        }

    async eliminar(id) {
        try {
        const pacientes = await this.LeerArchivo();
        const pacientesRestantes = pacientes.filter(p => p.id !== parseInt(id));

        await this.guardarArchivo(pacientesRestantes);
        return true;

        }catch (error) {
            return false;
        }
    }

}

module.exports = new Modelopacientes();