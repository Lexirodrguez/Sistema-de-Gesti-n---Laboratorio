const fs = require("fs-extra");
const path = require("path");

class Examen {
    constructor() {
        this.dataPath = path.join(__dirname, "..", "Datos", "examenes.json");
    }

    async saveData(data) {
        try {
            await fs.writeJson(this.dataPath, data);
            return true;
        } catch (error) {
            console.error("Error al guardar datos de examenes", error);
            return false;
        }
    }

    async getAll() {
        return await this.getData();
    }

    async getById(id) {
        const examenes = await this.getData();
        return examenes.find(e => e.id === id);
    }

    async create(data) {
        const examenes = await this.getData();
        const newId = examenes.length > 0 ? Math.max(...examenes.map(e => e.id)) + 1 : 1;
        const nuevoExamen = {
            id: newId,
            ...data,
            precio: parseFloat(data.precio)
        };

        examenes.push(nuevoExamen);
        await this.saveData(examenes);
        return nuevoExamen;
    }

    async update(id, data) {
        const examenes = await this.getData();
        const index = examenes.findIndex(e => e.id == id);

        if (index === -1) return null;

        if (data.precio) data.precio = parseFloat(data.precio);
        examenes[index] = {...examenes[index], ...data};
        await this.saveData(examenes);
        return examenes [index];
    }

    async delete(id) {
        const examenes = await this.getData();
        const index = examenes. findIndex(e => e.id == id);

        if (index === -1) return false;

        examenes.splice(index, 1);
        await this.saveData(examenes);
        return true;

    }

    }

    module.exports = Examen;