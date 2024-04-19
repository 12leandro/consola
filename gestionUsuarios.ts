import * as fs from 'fs';

type Usuario = {
    servicios: number;
    impuestos: number;
    comida: number;
    articulos_de_limpieza: number;
    articulos_de_higiene: number;
    otros: number;
};


export async function gestionUsuarios(): Promise<string> {
    const nombreArchivo: string = 'gastos.json';

    try {
        
        const inquirer = await import('inquirer');

        
        const data = await fs.promises.readFile(nombreArchivo, 'utf-8');
        const usuarios: Record<string, Usuario> = JSON.parse(data);

        
        console.log('Usuarios existentes:');
        const usuariosExist = Object.keys(usuarios);
        usuariosExist.forEach((usuario, index) => {
            console.log(`${index + 1}. ${usuario}`);
        });

        
        const respuesta = await inquirer.default.prompt([
            {
                type: 'list',
                name: 'accion',
                message: 'Seleccione una acción:',
                choices: ['Elegir usuario existente', 'Crear nuevo usuario'],
            },
        ]);

        if (respuesta.accion === 'Elegir usuario existente') {
            const usuarioSeleccionadoRespuesta = await inquirer.default.prompt([
                {
                    type: 'list',
                    name: 'nombreUsuario',
                    message: 'Seleccione un usuario existente:',
                    choices: usuariosExist,
                },
            ]);
            const nombreUsuarioSeleccionado = usuarioSeleccionadoRespuesta.nombreUsuario;
            console.log(`Ha seleccionado el usuario '${nombreUsuarioSeleccionado}'.`);
            return nombreUsuarioSeleccionado;
        } else {
            const nuevoUsuarioRespuesta = await inquirer.default.prompt([
                {
                    type: 'input',
                    name: 'nombreUsuario',
                    message: 'Ingrese el nombre del nuevo usuario:',
                },
            ]);
            const nuevoUsuario: Usuario = {
                servicios: 0,
                impuestos: 0,
                comida: 0,
                articulos_de_limpieza: 0,
                articulos_de_higiene: 0,
                otros: 0,
            };
            const nombreNuevoUsuario = nuevoUsuarioRespuesta.nombreUsuario;
            usuarios[nombreNuevoUsuario] = nuevoUsuario;
            await fs.promises.writeFile(nombreArchivo, JSON.stringify(usuarios, null, 2));
            console.log(`Usuario '${nombreNuevoUsuario}' creado satisfactoriamente.`);
            return nombreNuevoUsuario;
        }
    } catch (error) {
        console.error('Error al gestionar usuarios:', error);
        return ''; 
    }
}
