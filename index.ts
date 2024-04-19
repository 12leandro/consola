import { gestionGastos } from './gestionGastos';
import { gestionUsuarios } from './gestionUsuarios';
import { verificarYCrearArchivo } from './verificarCrear';
async function run() {
  const chalk = await import('chalk');
  const inquirer = await import('inquirer');

  const chalkModule = chalk.default; 
  console.log(chalkModule.blue("Bienvenido a tu app de gestión de gastos."))
  await verificarYCrearArchivo();
  console.log(chalkModule.green("----------------------------"));
  const user = await gestionUsuarios();
  await gestionGastos(user);
  console.log(chalkModule.green("----------------------------"));
}

run();
