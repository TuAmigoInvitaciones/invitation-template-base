import path from 'path'
import fs from 'fs'
import pc from 'picocolors'
import { ask, printHeader } from './prompts.js'

const DEFAULT_CLIENTS_DIR = 'C:\\TuAmigoInvitaciones\\Paquetes'

export async function promptProjectSetup() {
    printHeader('WIZARD DE CREACIÓN DE INVITACIONES DIGITALES')

    // 0. Identificación del proyecto y ruta de destino
    const defaultFolderName = 'invitacion-' + Date.now().toString().slice(-4)
    const folderName = await ask('Nombre de la carpeta del cliente', defaultFolderName)
    const defaultPath = path.join(DEFAULT_CLIENTS_DIR, folderName)
    const customPath = await ask('Ruta donde deseas guardar la invitación', defaultPath)

    let targetPath = path.resolve(customPath.trim())
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory() && path.basename(targetPath) !== folderName) {
        targetPath = path.join(targetPath, folderName)
    }

    console.log(`\n${pc.bold(pc.green('El nuevo proyecto se creará en:'))}\n   ${pc.cyan(targetPath)}\n`)

    return {
        folderName,
        targetPath,
    }
}
