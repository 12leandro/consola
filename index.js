async function run() {
  const { verificarYCrearArchivo } = await import('./verificarCrear');
  const { gestionUsuarios } = await import('./gestionUsuarios');
  const { gestionGastos } = await import('./gestionGastos');
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
