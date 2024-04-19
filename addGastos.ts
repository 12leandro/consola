import * as fs from 'fs';

type Usuario = {
    servicios: number;
    impuestos: number;
    comida: number;
    articulos_de_limpieza: number;
    articulos_de_higiene: number;
    otros: number;
};

export async function agregarGasto(nombreUsuario: string): Promise<void> {
    const nombreArchivo: string = 'gastos.json';

    try {
        while (true) {
            
            const data = await fs.promises.readFile(nombreArchivo, 'utf-8');
            const usuarios: Record<string, Usuario> = JSON.parse(data);

            
            if (!(nombreUsuario in usuarios)) {
                console.log(`El usuario '${nombreUsuario}' no existe.`);
                return;
            }

            
            const respuesta = await seleccionarCategoria();

            
            const monto = await preguntarMonto();

            
            usuarios[nombreUsuario][respuesta.categoria] += monto;

            
            await fs.promises.writeFile(nombreArchivo, JSON.stringify(usuarios, null, 2));
            console.log(`Gasto agregado correctamente en la categoría '${respuesta.categoria}'.`);

            
            const continuar = await preguntarContinuar();
            if (!continuar) {
                break;
            }
        }
    } catch (error) {
        console.error('Error al agregar el gasto:', error);
    }
}

async function seleccionarCategoria(): Promise<{ categoria: string }> {
    const inquirer = await import('inquirer');

    const respuesta = await inquirer.default.prompt([
        {
            type: 'list',
            name: 'categoria',
            message: 'Seleccione la categoría de gasto:',
            choices: ['servicios', 'impuestos', 'comida', 'articulos_de_limpieza', 'articulos_de_higiene', 'otros'],
        },
    ]);

    return respuesta;
}

async function preguntarMonto(): Promise<number> {
    const inquirer = await import('inquirer');

    let monto: number | undefined;
    while (typeof monto !== 'number') {
        const respuesta = await inquirer.default.prompt([
            {
                type: 'input',
                name: 'monto',
                message: 'Ingrese el monto del gasto (debe ser un número):',
                validate: (input: string) => {
                    const parsed = parseFloat(input);
                    if (isNaN(parsed)) {
                        return 'Por favor, ingrese un número válido.';
                    }
                    return true;
                },
            },
        ]);
        monto = parseFloat(respuesta.monto);
    }

    return monto;
}


async function preguntarContinuar(): Promise<boolean> {
    const inquirer = await import('inquirer');

    const respuesta = await inquirer.default.prompt([
        {
            type: 'confirm',
            name: 'continuar',
            message: '¿Desea agregar otro gasto?',
            default: true,
        },
    ]);

    return respuesta.continuar;
}
