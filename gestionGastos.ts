import * as fs from 'fs';
import { agregarGasto } from './addGasto';

type Usuario = {
    servicios: number;
    impuestos: number;
    comida: number;
    articulos_de_limpieza: number;
    articulos_de_higiene: number;
    otros: number;
};


export async function gestionGastos(nombreUsuario: string): Promise<void> {
    const nombreArchivo: string = 'gastos.json';

    try {
        
        const inquirer = await import('inquirer');

        
        const data = await fs.promises.readFile(nombreArchivo, 'utf-8');
        const usuarios: Record<string, Usuario> = JSON.parse(data);

        
        if (!(nombreUsuario in usuarios)) {
            console.log(`El usuario '${nombreUsuario}' no existe.`);
            return;
        }

       
        const respuesta = await inquirer.default.prompt([
            {
                type: 'list',
                name: 'accion',
                message: `Seleccione una acción para el usuario '${nombreUsuario}':`,
                choices: ['Agregar gasto', 'Imprimir todos los gastos'],
            },
        ]);

        if (respuesta.accion === 'Agregar gasto') {
            
          await agregarGasto(nombreUsuario);
        } else if (respuesta.accion === 'Imprimir todos los gastos') {
            
            console.log(`Gastos del usuario '${nombreUsuario}':`);
            console.log(usuarios[nombreUsuario]);

            
            const gastoTotal = Object.values(usuarios[nombreUsuario]).reduce((total, gasto) => total + gasto, 0);
            console.log(`Gasto total: $${gastoTotal.toFixed(2)}`);
        }
    } catch (error) {
        console.error('Error al gestionar los gastos:', error);
    }
}
