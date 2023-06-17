import { Tarea } from "./tarea.js";
import colors from "colors";

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      listado.push(this._listado[key]);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, index) => {
      const idx = (index + 1 + ".").green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Compleado".green : "Pendiente".red;

      console.log(`${idx} ${desc} :: ${estado} `);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    let arreglo;
    if (completadas) {
      arreglo = this.listadoArr.filter((tarea) => tarea.completadoEn !== null);
    } else {
      arreglo = this.listadoArr.filter((tarea) => tarea.completadoEn === null);
    }

    arreglo.forEach((tarea, index) => {
      const idx = (index + 1 + ".").green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? completadoEn.green : "Pendiente".red;

      console.log(`${idx} ${desc} :: ${estado} `);
    });
  }

  toggleCompletadas(ids = []) {
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      } else {
        this._listado[tarea.id].completadoEn = new Date().toISOString();
      }
    });
  }
}

export { Tareas };
