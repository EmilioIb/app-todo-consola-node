import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";
import {
  inquireMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  listadoTareasCompletar,
} from "./helpers/inquirer.js";
import { Tareas } from "./models/tareas.js";

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquireMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
        console.log("Tarea creada!!!");
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarPendientesCompletadas();
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        const ids = await listadoTareasCompletar(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        console.log("Tareas actualizadas!!!");
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== 0) {
          const ok = await confirmar("¿Está seguro?");

          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada!!!");
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    console.log("\n");
    await pausa();
  } while (opt !== "0");
};

main();
