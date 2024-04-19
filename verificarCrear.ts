import * as fs from 'fs';


export async function verificarYCrearArchivo(): Promise<void> {
    const nombreArchivo: string = 'gastos.json';

    
    fs.promises.access(nombreArchivo, fs.constants.F_OK)
        .then(() => {
            console.log(`El archivo '${nombreArchivo}' ya existe.`);
        })
        .catch(() => {
            
            const datos: object = {};
            
            fs.promises.writeFile(nombreArchivo, JSON.stringify(datos))
                .then(() => {
                    console.log(`Archivo '${nombreArchivo}' creado satisfactoriamente.`);
                })
                .catch((err) => {
                    console.error(`Error al crear el archivo '${nombreArchivo}': ${err}`);
                });
        });
}
