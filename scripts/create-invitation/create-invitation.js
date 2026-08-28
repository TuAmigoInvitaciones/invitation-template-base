import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const TEMPLATE_ROOT = path.resolve(__dirname, '..')
const DEFAULT_CLIENTS_DIR = 'C:\\Users\\roman\\OneDrive\\Escritorio\\proyectos-desarrollo\\invitaciones\\Clientes'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const ask = (query, defaultValue = '') => {
    return new Promise((resolve) => {
        const promptText = defaultValue ? `${query} (Predeterminado: "${defaultValue}"): ` : `${query}: `
        rl.question(promptText, (answer) => {
            resolve(answer.trim() || defaultValue)
        })
    })
}

const askConfirm = async (query, defaultYes = true) => {
    const hint = defaultYes ? '(S/n)' : '(s/N)'
    const answer = await ask(`${query} ${hint}`, defaultYes ? 's' : 'n')
    return answer.toLowerCase().startsWith('s')
}

const askSelect = async (query, options) => {
    console.log(`\nðŸ“Œ ${query}`)
    options.forEach((opt, index) => {
        console.log(`   [${index + 1}] ${opt.label}`)
    })
    const choiceStr = await ask('   Selecciona una opciÃ³n (nÃºmero)', '1')
    const choiceNum = parseInt(choiceStr, 10)
    if (isNaN(choiceNum) || choiceNum < 1 || choiceNum > options.length) {
        return options[0].value
    }
    return options[choiceNum - 1].value
}

const copyRecursive = (src, dest) => {
    const ignoreList = ['node_modules', '.git', 'dist', '.gemini', '.vscode']
    const stats = fs.statSync(src)

    if (stats.isDirectory()) {
        const basename = path.basename(src)
        if (ignoreList.includes(basename)) return

        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true })
        }

        const entries = fs.readdirSync(src)
        for (const entry of entries) {
            copyRecursive(path.join(src, entry), path.join(dest, entry))
        }
    } else {
        fs.copyFileSync(src, dest)
    }
}

const formatDateFormatted = (dateStr) => {
    try {
        const [year, month, day] = dateStr.split('-').map(Number)
        if (year && month && day) {
            const dateObj = new Date(year, month - 1, day)
            return dateObj.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }).toUpperCase()
        }
    } catch {
        // Fallback
    }
    return '20 DE NOVIEMBRE DE 2026'
}

async function main() {
    console.log('\n===================================================================')
    console.log('  ðŸš€ WIZARD AVANZADO DE CREACIÃ“N DE INVITACIONES DIGITALES ðŸš€')
    console.log('===================================================================\n')

    const defaultFolderName = 'invitacion-' + Date.now().toString().slice(-4)
    const folderName = await ask('ðŸ“ Nombre de la carpeta del cliente', defaultFolderName)
    const defaultPath = path.join(DEFAULT_CLIENTS_DIR, folderName)
    const customPath = await ask('ðŸ“ Ruta donde deseas guardar la invitaciÃ³n', defaultPath)

    let targetPath = path.resolve(customPath.trim())
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory() && path.basename(targetPath) !== folderName) {
        targetPath = path.join(targetPath, folderName)
    }

    console.log(`\nðŸ“Œ El nuevo proyecto se crearÃ¡ en:\n   ${targetPath}\n`)

    // 1. Tipo de evento
    const eventType = await askSelect('1. Tipo de Evento:', [
        { label: 'Boda ðŸ’', value: 'wedding' },
        { label: 'XV AÃ±os ðŸ‘‘', value: 'xv' },
        { label: 'GraduaciÃ³n ðŸŽ“', value: 'graduation' },
        { label: 'Fiesta Infantil ðŸŽˆ', value: 'kids' },
        { label: 'General / CumpleaÃ±os / Otro ðŸŽ‰', value: 'general' },
    ])

    // 2. Paquete seleccionado segÃºn tipo de evento
    let packageTier = 'standard'
    let defaultShowGallery = false
    let hasTicketingSystem = false
    let hasMusic = true

    if (eventType === 'wedding' || eventType === 'xv' || eventType === 'general') {
        packageTier = await askSelect('2. Paquete de CatÃ¡logo:', [
            { label: 'InvitaciÃ³n con FotografÃ­as (Incluye GalerÃ­a) ðŸ“¸', value: 'with_photos' },
            { label: 'InvitaciÃ³n sin FotografÃ­as ðŸ“„', value: 'without_photos' },
        ])
        defaultShowGallery = packageTier === 'with_photos'
    } else if (eventType === 'kids') {
        packageTier = await askSelect('2. Paquete de Fiesta Infantil:', [
            { label: 'BÃ¡sica TemÃ¡tica ($299.99) - Esencial WhatsApp ðŸŽˆ', value: 'basic_kids' },
            { label: 'Premium / Formal ($499.99) - Interpuesta Completa â­', value: 'premium_kids' },
        ])
        defaultShowGallery = packageTier === 'premium_kids'
        hasMusic = packageTier === 'premium_kids'
    } else if (eventType === 'graduation') {
        packageTier = 'graduation_tickets'
        defaultShowGallery = true
        hasTicketingSystem = true
    }

    // 3. Matriz por defecto de Secciones segÃºn tipo de evento y paquete
    const sectionToggles = {
        showHero: true,
        showCountdown: eventType !== 'kids' || packageTier === 'premium_kids',
        showMessage: true,
        showFamily: eventType === 'wedding' || eventType === 'xv',
        showPlaces: true,
        showGraduates: eventType === 'graduation',
        showDressCode: eventType !== 'kids' || packageTier === 'premium_kids',
        showItinerary: eventType !== 'kids' || packageTier === 'premium_kids',
        showDetails: true,
        showGallery: defaultShowGallery,
        showPresents: eventType === 'wedding' || eventType === 'xv' || packageTier === 'premium_kids' || eventType === 'general',
        showConfirmation: true,
        showRsvp: eventType === 'graduation',
        showFarewell: true,
    }

    // OpciÃ³n para ajustar individualmente secciones
    const customizeSections = await askConfirm('3. Â¿Deseas personalizar manualmente la inclusiÃ³n de secciones individuales?', false)
    if (customizeSections) {
        console.log('\nðŸ”§ Ajuste fino de secciones (S/n):')
        sectionToggles.showHero = await askConfirm('   -> Â¿Incluir Portada / Hero?', sectionToggles.showHero)
        sectionToggles.showCountdown = await askConfirm('   -> Â¿Incluir Cuenta Regresiva & Calendario?', sectionToggles.showCountdown)
        sectionToggles.showFamily = await askConfirm('   -> Â¿Incluir SecciÃ³n de Familia / Padres?', sectionToggles.showFamily)
        sectionToggles.showPlaces = await askConfirm('   -> Â¿Incluir Ubicaciones (Ceremonia / Fiesta)?', sectionToggles.showPlaces)
        sectionToggles.showGraduates = await askConfirm('   -> Â¿Incluir Lista de Graduados?', sectionToggles.showGraduates)
        sectionToggles.showDressCode = await askConfirm('   -> Â¿Incluir CÃ³digo de Vestimenta?', sectionToggles.showDressCode)
        sectionToggles.showItinerary = await askConfirm('   -> Â¿Incluir Itinerario / Amenidades?', sectionToggles.showItinerary)
        sectionToggles.showDetails = await askConfirm('   -> Â¿Incluir Notas / Recordatorios?', sectionToggles.showDetails)
        sectionToggles.showGallery = await askConfirm('   -> Â¿Incluir GalerÃ­a de Fotos?', sectionToggles.showGallery)
        sectionToggles.showPresents = await askConfirm('   -> Â¿Incluir Mesa de Regalos?', sectionToggles.showPresents)
        sectionToggles.showConfirmation = await askConfirm('   -> Â¿Incluir ConfirmaciÃ³n de Asistencia / WhatsApp?', sectionToggles.showConfirmation)
        sectionToggles.showRsvp = await askConfirm('   -> Â¿Incluir MÃ³dulo RSVP / Pases de Boletos?', sectionToggles.showRsvp)
    }

    // 4. Captura de Datos del Evento (Adaptativo)
    console.log('\nðŸ“ 4. Captura de Datos del Evento:')
    let promptNamesDefault = 'MarÃ­a & Carlos'
    if (eventType === 'xv') promptNamesDefault = 'SofÃ­a Guadalupe'
    else if (eventType === 'graduation') promptNamesDefault = 'IngenierÃ­a en Sistemas 2022-2026'
    else if (eventType === 'kids') promptNamesDefault = 'Mateo - 5Âº CumpleaÃ±os'

    const names = await ask(`   -> Nombre de novios / festejado / carrera`, promptNamesDefault)

    const eventDate = await ask('   -> Fecha del evento principal (YYYY-MM-DD)', '2026-11-20')
    const mainTime = await ask('   -> Hora del evento principal', '17:00 HRS')

    // Ubicaciones interactivas (MÃºltiples ubicaciones)
    const locationItems = []
    if (sectionToggles.showPlaces) {
        console.log('\nðŸ“ ConfiguraciÃ³n de Ubicaciones:')
        console.log('   (Agrega las ubicaciones que necesites. Escribe -1 en cualquiera de las respuestas para terminar)\n')

        let locCount = 1
        let keepAdding = true

        while (keepAdding) {
            console.log(`   --- UbicaciÃ³n #${locCount} ---`)
            const defaultTitle = locCount === 1 ? 'Ceremonia / Misa' : (locCount === 2 ? 'RecepciÃ³n / Fiesta' : `UbicaciÃ³n ${locCount}`)
            const nameInput = await ask(`   -> Nombre de Ubicacion ${locCount}`, defaultTitle)

            if (nameInput === '-1') {
                keepAdding = false
                break
            }

            const addressInput = await ask(`   -> Direccion de ubicacion ${locCount}`, 'SalÃ³n Los Pinos, Av. Reforma 123')
            if (addressInput === '-1') {
                keepAdding = false
                break
            }

            const linkInput = await ask(`   -> Link de Ubicacion ${locCount}`, 'https://maps.google.com')
            if (linkInput === '-1') {
                keepAdding = false
                break
            }

            const timeInput = await ask(`   -> Hora de Ubicacion ${locCount}`, mainTime)
            if (timeInput === '-1') {
                keepAdding = false
                break
            }

            locationItems.push({
                title: nameInput,
                location: addressInput,
                url: linkInput,
                time: timeInput,
                date: eventDate,
            })

            locCount++
        }

        if (locationItems.length === 0) {
            locationItems.push({
                title: 'RecepciÃ³n & Evento Principal',
                location: 'SalÃ³n Los Pinos, Av. Reforma 123',
                url: 'https://maps.google.com',
                time: mainTime,
                date: eventDate,
            })
        }
    }

    // Itinerario interactivo
    const itineraryItems = []
    if (sectionToggles.showItinerary) {
        console.log('\n   -> ConfiguraciÃ³n del Itinerario:')
        console.log('      (Escribe -1 en la hora cuando termines de agregar Ã­tems)')

        let keepAdding = true
        while (keepAdding) {
            const timeInput = await ask(
                `      -> Hora de amenidad #${itineraryItems.length + 1} (o -1 para terminar)`,
                itineraryItems.length === 0 ? mainTime : '-1'
            )

            if (timeInput === '-1') {
                keepAdding = false
                break
            }

            const eventTitle = await ask(`      -> DescripciÃ³n para ${timeInput}`, 'RecepciÃ³n & Evento')
            itineraryItems.push({ time: timeInput, event: eventTitle })
        }

        if (itineraryItems.length === 0) {
            itineraryItems.push({ time: mainTime, event: 'RecepciÃ³n & Evento Principal' })
        }
    }

    // Mesa de Regalos
    let presentsTitle = 'Mesa de Regalos Liverpool'
    let presentsUrl = 'https://mesaderegalos.liverpool.com.mx'
    if (sectionToggles.showPresents) {
        presentsTitle = await ask('   -> TÃ­tulo / Modalidad de Regalos (ej. Lluvia de Sobres / Liverpool)', 'Mesa de Regalos Liverpool')
        presentsUrl = await ask('   -> Link de Mesa de Regalos / Datos bancarios', 'https://mesaderegalos.liverpool.com.mx')
    }

    // 5. Estilo de Tema y Fuentes
    console.log('\nðŸŽ¨ 5. PersonalizaciÃ³n Visual del Tema:')
    const palette = await askSelect('Paleta de Colores a usar:', [
        { label: 'Paleta 1: Dusty Rose & Deep Plum ðŸŒ¸', value: 1 },
        { label: 'Paleta 2: Crimson Wine & Warm Gold ðŸ·', value: 2 },
        { label: 'Paleta 3: Olive Sage & Warm Taupe ðŸŒ¿', value: 3 },
        { label: 'Paleta 4: Forest Green & Powder Pink ðŸŒ²', value: 4 },
        { label: 'Paleta 5: Soft Blue & Steel Blue ðŸŒŠ', value: 5 },
        { label: 'Paleta 6: Slate Teal & Mint ðŸƒ', value: 6 },
        { label: 'Paleta 7: Fresh Lime & Olive ðŸ‹', value: 7 },
        { label: 'Paleta 8: Warm Gold & Terracotta ðŸ†', value: 8 },
    ])

    const fontPack = await askSelect('Estilo de TipografÃ­a (Font Pack):', [
        { label: 'Pack 1: Alex Brush + Cormorant Garamond + Montserrat', value: 1 },
        { label: 'Pack 2: Pinyon Script + Bodoni Moda + Plus Jakarta Sans', value: 2 },
        { label: 'Pack 3: Greating + EB Garamond + Open Sans', value: 3 },
        { label: 'Pack 4: Amsterdam Signature + Playfair Display + Raleway', value: 4 },
        { label: 'Pack 5: Halimunde Signature + Cinzel + Outfit', value: 5 },
    ])

    rl.close()

    console.log('\n===================================================================')
    console.log(' â³ CREANDO PROYECTO Y COMPILANDO ARCHIVO DE CONFIGURACIÃ“N...')
    console.log('===================================================================\n')

    // Formatear ISO date para cuenta regresiva
    const [hour = '17', minute = '00'] = mainTime.replace(/[^0-9:]/g, '').split(':')
    const paddedHour = hour.padStart(2, '0')
    const paddedMinute = minute.padStart(2, '0')
    const targetDateIso = `${eventDate}T${paddedHour}:${paddedMinute}:00`

    const configManifest = {
        eventType,
        packageTier,
        theme: {
            fontPack,
            palette,
            buttonVariant: 'primary',
            menu: {
                show: true,
                variant: 'bar',
                title: names,
                buttonVariant: 'icon',
            },
            music: {
                show: hasMusic,
                variant: 'floating',
                buttonVariant: 'primary',
                songTitle: 'MÃºsica de fondo',
                artistName: 'MÃºsica del evento',
            },
        },
        config: {
            hasTicketingSystem,
            hasRSVP: sectionToggles.showConfirmation || sectionToggles.showRsvp,
            hasMusic,
            hasMenu: true,
        },
        sections: {
            hero: {
                showHero: sectionToggles.showHero,
                names,
                subtitle: 'Nos complace invitarte a celebrar este momento tan especial con nosotros',
                date: formatDateFormatted(eventDate),
                bgImage: '',
            },
            message: {
                showMessage: sectionToggles.showMessage,
                message: 'Te invitamos de corazÃ³n a acompaÃ±arnos a compartir la alegrÃ­a de este dÃ­a inolvidable.',
            },
            countdown: {
                showCountdown: sectionToggles.showCountdown,
                targetDate: targetDateIso,
            },
            family: {
                showFamily: sectionToggles.showFamily,
            },
            places: {
                showPlaces: sectionToggles.showPlaces,
                locations: locationItems,
            },
            graduates: {
                showGraduates: sectionToggles.showGraduates,
            },
            itinerary: {
                showItinerary: sectionToggles.showItinerary,
                itinerary: itineraryItems,
            },
            dressCode: {
                showDressCode: sectionToggles.showDressCode,
                title: 'CÃ³digo de Vestimenta',
                description: 'Te sugerimos vestir de etiqueta semi-formal.',
                attire: {
                    men: 'Traje oscuro y corbata.',
                    women: 'Vestido largo o cocktail.',
                },
                colors: {
                    suggested: ['negro', 'azul oscuro'],
                    avoid: ['blanco', 'beige'],
                },
            },
            details: {
                showDetails: sectionToggles.showDetails,
            },
            gallery: {
                showGallery: sectionToggles.showGallery,
                title: 'GalerÃ­a de Fotos',
                images: [],
            },
            presents: {
                showPresents: sectionToggles.showPresents,
                title: presentsTitle,
                url: presentsUrl,
            },
            confirmation: {
                showConfirmation: sectionToggles.showConfirmation,
            },
            rsvp: {
                showRsvp: sectionToggles.showRsvp,
            },
            farewell: {
                showFarewell: sectionToggles.showFarewell,
            },
        },
    }

    // Copiar la estructura del template a la carpeta destino
    copyRecursive(TEMPLATE_ROOT, targetPath)

    // Escribir invitation.config.json en la carpeta destino
    const configPath = path.join(targetPath, 'invitation.config.json')
    fs.writeFileSync(configPath, JSON.stringify(configManifest, null, 2), 'utf-8')

    // Generar .env y .env.template con VITE_EVENT_ID
    const envPath = path.join(targetPath, '.env')
    const envTemplatePath = path.join(targetPath, '.env.template')
    const envContent = `VITE_BACKEND_URL=https://abrasa-tickets-backend-production.up.railway.app\nVITE_EVENT_ID=\n`
    const envTemplateContent = `VITE_BACKEND_URL=\nVITE_EVENT_ID=\n`
    fs.writeFileSync(envPath, envContent, 'utf-8')
    fs.writeFileSync(envTemplatePath, envTemplateContent, 'utf-8')

    console.log('âœ… Archivo invitation.config.json generado exitosamente.')

    // 6. OptimizaciÃ³n Modular: EliminaciÃ³n de archivos no utilizados y reescritura de Invitation.tsx y app.scss
    console.log('ðŸ§¹ Optimizando componentes, estilos y hooks segÃºn secciones seleccionadas...')

    const SECTIONS_METADATA = [
        { key: 'showHero', folder: 'hero', component: 'HeroSection', importPath: './hero/HeroSection', scss: '../../modules/invitation/hero/hero' },
        { key: 'showCountdown', folder: 'countdown', component: 'CountdownSection', importPath: './countdown/CountdownSection', scss: '../../modules/invitation/countdown/countdown-section' },
        { key: 'showMessage', folder: 'message', component: 'MessageSection', importPath: './message/Message', scss: '../../modules/invitation/message/message' },
        { key: 'showFamily', folder: 'family', component: 'FamilySection', importPath: './family/FamilySection', scss: '../../modules/invitation/family/family' },
        { key: 'showPlaces', folder: 'places', component: 'PlacesSection', importPath: './places/PlacesSection', scss: '../../modules/invitation/places/places' },
        { key: 'showGraduates', folder: 'graduates', component: 'GraduatesSection', importPath: './graduates/GraduatesSection', scss: '../../modules/invitation/graduates/graduates', hook: 'useGraduates.ts' },
        { key: 'showDressCode', folder: 'dress-code', component: 'DressCodeSection', importPath: './dress-code/DressCodeSection', scss: '../../modules/invitation/dress-code/dress-code' },
        { key: 'showItinerary', folder: 'itinerary', component: 'ItinerarySection', importPath: './itinerary/ItinerarySection', scss: '../../modules/invitation/itinerary/itinerary' },
        { key: 'showDetails', folder: 'details', component: 'DetailsSection', importPath: './details/DetailsSection', scss: '../../modules/invitation/details/details' },
        { key: 'showGallery', folder: 'gallery', component: 'GallerySection', importPath: './gallery/GallerySection', scss: '../../modules/invitation/gallery/gallery' },
        { key: 'showPresents', folder: 'presents', component: 'PresentsSection', importPath: './presents/PresentsSection', scss: '../../modules/invitation/presents/presents' },
        { key: 'showConfirmation', folder: 'confirmation', component: 'ConfirmationSection', importPath: './confirmation/ConfirmationSection', scss: '../../modules/invitation/confirmation/confirmation' },
        { key: 'showRsvp', folder: 'rsvp', component: 'RsvpSection', importPath: './rsvp/RsvpSection', scss: '../../modules/invitation/rsvp/rsvp' },
        { key: 'showFarewell', folder: 'farewell', component: 'FarewellSection', importPath: './farewell/FarewellSection', scss: '../../modules/invitation/farewell/farewell' },
    ]

    const removePathSync = (target) => {
        if (fs.existsSync(target)) {
            fs.rmSync(target, { recursive: true, force: true })
        }
    }

    // A) Eliminar fÃ­sicamente carpetas de secciones no seleccionadas
    for (const item of SECTIONS_METADATA) {
        const isEnabled = sectionToggles[item.key]
        if (!isEnabled) {
            const sectionDir = path.join(targetPath, 'src', 'modules', 'invitation', item.folder)
            removePathSync(sectionDir)

            if (item.hook) {
                const hookFile = path.join(targetPath, 'src', 'common', 'hooks', item.hook)
                removePathSync(hookFile)
            }
        }
    }

    // B) Eliminar sistema de boletos/bÃºsqueda si no es necesario
    if (!hasTicketingSystem) {
        removePathSync(path.join(targetPath, 'src', 'modules', 'search'))
        removePathSync(path.join(targetPath, 'src', 'modules', 'ticket'))
        removePathSync(path.join(targetPath, 'src', 'common', 'hooks', 'useTicket.ts'))

        const modulesIndexPath = path.join(targetPath, 'src', 'modules', 'index.ts')
        const modulesIndexContent = `export { envelopee } from './envelopee/envelopee'\nexport { Invitation } from './invitation/Invitation'\n`
        fs.writeFileSync(modulesIndexPath, modulesIndexContent, 'utf-8')

        const routerAppPath = path.join(targetPath, 'src', 'router', 'RouterApp.tsx')
        const routerAppContent = `import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { envelopee, Invitation } from '@/modules'

export const RouterApp: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Invitation />} />
                <Route path="/envelopee" element={<envelopee />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}
`
        fs.writeFileSync(routerAppPath, routerAppContent, 'utf-8')
    }

    // C) Ajustar src/common/hooks/index.ts
    const hooksIndexPath = path.join(targetPath, 'src', 'common', 'hooks', 'index.ts')
    if (fs.existsSync(hooksIndexPath)) {
        let hooksIndexContent = fs.readFileSync(hooksIndexPath, 'utf-8')
        if (!sectionToggles.showGraduates) {
            hooksIndexContent = hooksIndexContent.replace("export { useGraduates } from './useGraduates'\n", '')
        }
        if (!hasTicketingSystem) {
            hooksIndexContent = hooksIndexContent.replace("export { useTicket } from './useTicket'\n", '')
        }
        fs.writeFileSync(hooksIndexPath, hooksIndexContent, 'utf-8')
    }

    // D) Reescritura dinÃ¡mica de src/modules/invitation/Invitation.tsx
    const activeSections = SECTIONS_METADATA.filter(sec => sectionToggles[sec.key])
    const importsCode = activeSections
        .map(sec => `import { ${sec.component} } from '${sec.importPath}'`)
        .join('\n')

    const isGraduation = eventType === 'graduation'
    let jsxElements = []

    for (const sec of activeSections) {
        if (sec.key === 'showRsvp') {
            continue
        }
        if (sec.key === 'showFamily' && isGraduation && sectionToggles.showRsvp) {
            jsxElements.push('            <RsvpSection />')
        }
        jsxElements.push(`            <${sec.component} />`)
    }

    if (!isGraduation && sectionToggles.showRsvp) {
        const farewellIndex = jsxElements.findIndex(el => el.includes('FarewellSection'))
        if (farewellIndex !== -1) {
            jsxElements.splice(farewellIndex, 0, '            <RsvpSection />')
        } else {
            jsxElements.push('            <RsvpSection />')
        }
    }

    const invitationContent = `import React from 'react'
import { useMenu } from '@/common/hooks'

${importsCode}

export const Invitation: React.FC = () => {
    const { activeVariant, isMenuVisible } = useMenu()

    const hasMenuBarClass = isMenuVisible && activeVariant === 'bar' ? 'invitation--has-menu-bar' : ''
    const containerClass = \`invitation \${hasMenuBarClass}\`.trim()

    return (
        <main className={containerClass}>
${jsxElements.join('\n')}
        </main>
    )
}
`
    const invitationFilePath = path.join(targetPath, 'src', 'modules', 'invitation', 'Invitation.tsx')
    fs.writeFileSync(invitationFilePath, invitationContent, 'utf-8')

    // E) Reescritura dinÃ¡mica de src/common/styles/app.scss
    const scssImports = activeSections
        .map(sec => `@use '${sec.scss}';`)
        .join('\n')

    const ticketingScss = hasTicketingSystem
        ? `\n\n// Invitation Search & Ticket\n@use '../../modules/search/search';\n@use '../../modules/ticket/ticket';`
        : ''

    const appScssContent = `@use './palettes';
@use './fonts';
@use './mixins';
@use './variables';
@use './animations';
@use './globals';
@use './typography';

// Common Components
@use '../components/button/button';
@use '../components/carousel/carousel';
@use '../components/modal/modal';
@use '../components/drawer/drawer';
@use '../components/music-player/music-player';
@use '../components/menu/menu';
@use '../components/toast/toast';
@use '../components/section-header/section-header';
@use '../components/accordion/accordion';
@use '../components/countdown/countdown';

// Invitation Module Sections
${scssImports}

// Invitation envelopee
@use '../../modules/envelopee/_envelopee.scss';${ticketingScss}
`
    const appScssPath = path.join(targetPath, 'src', 'common', 'styles', 'app.scss')
    fs.writeFileSync(appScssPath, appScssContent, 'utf-8')

    console.log('âœ… OptimizaciÃ³n de cÃ³digo completada: Secciones deshabilitadas eliminadas del bundle.')

    // Sincronizar tokens SCSS
    try {
        console.log('ðŸŽ¨ Compilando tokens SCSS del tema en la nueva invitaciÃ³n...')
        execSync('node scripts/sync-theme.js', { cwd: targetPath, stdio: 'inherit' })
    } catch (e) {
        console.warn('âš ï¸ Nota: Recuerda ejecutar npm run theme:sync en la carpeta generada si es necesario.')
    }

    console.log('\n===================================================================')
    console.log(' ðŸŽ‰ Â¡PROYECTO DE INVITACIÃ“N CREADO Y CONFIGURADO CON Ã‰XITO! ðŸŽ‰')
    console.log('===================================================================\n')
    console.log(`ðŸ“Œ Tipo de Evento: ${eventType.toUpperCase()} (${packageTier})`)
    console.log(`ðŸ“Œ UbicaciÃ³n: ${targetPath}\n`)
    console.log('Para iniciar el proyecto ejecuta:\n')
    console.log(`   cd "${targetPath}"`)
    console.log('   npm install')
    console.log('   npm run dev\n')
}

main().catch(console.error)

