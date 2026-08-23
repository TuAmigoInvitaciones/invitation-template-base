import pc from 'picocolors'
import { askSelect, askConfirm, ask, printSectionTitle } from './prompts.js'

export async function promptPackageSelection() {
    printSectionTitle('1. Tipo de Evento & Paquete Comercial')

    // 1. Tipo de Evento
    const eventType = await askSelect('1. Selecciona el Tipo de Evento:', [
        { label: 'Boda', value: 'wedding' },
        { label: 'XV Años', value: 'xv' },
        { label: 'Graduación', value: 'graduation' },
        { label: 'Fiesta Infantil', value: 'kids' },
        { label: 'General / Cumpleaños / Otro', value: 'general' },
    ])

    let packageTier = 'platino'
    let hasPhotos = false
    let basePrice = 0
    let packageName = ''

    if (eventType === 'kids') {
        packageTier = await askSelect('2. Paquete de Fiesta Infantil:', [
            { label: 'Esmeralda ($199.99) - Básica / Temática', value: 'esmeralda' },
            { label: 'Cuarzo ($399.99) - Premium / Formal', value: 'cuarzo' },
        ])

        if (packageTier === 'esmeralda') {
            packageName = 'Esmeralda (Básica / Temática)'
            basePrice = 199.99
            hasPhotos = false
        } else {
            packageName = 'Cuarzo (Premium / Formal)'
            basePrice = 399.99
            hasPhotos = true
        }
    } else {
        // 2. Línea Visual (Con Fotos vs Sin Fotos)
        hasPhotos = await askConfirm('2. ¿La invitación incluye Fotografías de sesión / galería?', true)

        const options = hasPhotos
            ? [
                { label: 'Bronce ($699.99) - Esencial Con Fotos (Logística + Itinerario + RSVP WhatsApp)', value: 'bronce' },
                { label: 'Platino ($899.99) - Intermedio Con Fotos (Familia + Regalos + Plataforma Abrasa)', value: 'platino' },
                { label: 'Oro ($1,099.99) - VIP Con Fotos (Abrasa + Scratch Reveal + Album QR + Monograma)', value: 'oro' },
                { label: 'Rubí ($1,899.00) - A la Medida Cero Plantilla Con Fotos', value: 'rubi' },
            ]
            : [
                { label: 'Bronce ($499.99) - Esencial Sin Fotos (Logística + Itinerario + RSVP WhatsApp)', value: 'bronce' },
                { label: 'Platino ($699.99) - Intermedio Sin Fotos (Familia + Regalos + Plataforma Abrasa)', value: 'platino' },
                { label: 'Oro ($899.99) - VIP Sin Fotos (Abrasa + Scratch Reveal + Album QR + Monograma)', value: 'oro' },
                { label: 'Rubí ($1,599.00) - A la Medida Cero Plantilla Sin Fotos', value: 'rubi' },
            ]

        packageTier = await askSelect('3. Selecciona el Nivel del Paquete:', options)

        const photoLabel = hasPhotos ? 'Con Fotos' : 'Sin Fotos'

        if (packageTier === 'bronce') {
            basePrice = hasPhotos ? 699.99 : 499.99
            packageName = `Bronce Esencial (${photoLabel})`
        } else if (packageTier === 'platino') {
            basePrice = hasPhotos ? 899.99 : 699.99
            packageName = `Platino Intermedio (${photoLabel})`
        } else if (packageTier === 'oro') {
            basePrice = hasPhotos ? 1099.99 : 899.99
            packageName = `Oro VIP Premium (${photoLabel})`
        } else {
            basePrice = hasPhotos ? 1899.00 : 1599.00
            packageName = `Rubí A la Medida (${photoLabel})`
        }
    }

    // 3. Módulo de Boletaje Electrónico QR
    let hasTicketingSystem = false
    let ticketCount = 0
    let pricePerTicket = 0
    let ticketTotalPrice = 0
    let hasTableAssignment = false

    if (eventType === 'graduation') {
        hasTicketingSystem = true
    } else {
        hasTicketingSystem = await askConfirm('🎟️ ¿Deseas incluir Módulo Adicional de Boletaje Electrónico QR?', false)
    }

    if (hasTicketingSystem) {
        const countStr = await ask('   -> Cantidad estimada de boletos / pases', '100')
        ticketCount = parseInt(countStr, 10) || 100

        if (ticketCount <= 100) pricePerTicket = 10.0
        else if (ticketCount <= 300) pricePerTicket = 9.0
        else if (ticketCount <= 500) pricePerTicket = 8.0
        else if (ticketCount <= 700) pricePerTicket = 6.0
        else pricePerTicket = 5.0

        ticketTotalPrice = ticketCount * pricePerTicket
        hasTableAssignment = await askConfirm('   -> ¿Incluir asignación de mesas y croquis interactivo de lugar?', true)
    }

    // 4. Módulos Extra Add-ons ($150 c/u - Habilitados por defecto si es paquete Oro o superior)
    console.log(`\n${pc.bold(pc.magenta('4. Módulos Extra Add-ons ($150.00 c/u):'))}`)
    const selectedAddons = {
        lodgingAndWeather: await askConfirm('   -> ¿Incluir Add-on Hospedaje & Clima?', false),
        ourStory: await askConfirm('   -> ¿Incluir Add-on Nuestra Historia / Cita?', false),
        faqAndMenu: await askConfirm('   -> ¿Incluir Add-on Preguntas Frecuentes & Menú?', false),
        playlistAndPhotos: await askConfirm('   -> ¿Incluir Add-on Playlist & Carga de Fotos de Invitados?', false),
        monogram: packageTier === 'oro' || packageTier === 'rubi' || await askConfirm('   -> ¿Incluir Add-on Monograma Exclusivo?', false),
    }

    const addonsCount = Object.values(selectedAddons).filter(Boolean).length
    const addonsTotalPrice = addonsCount * 150.0

    // 5. Secciones Progresivas según Paquete
    const isBronce = packageTier === 'bronce'
    const isEsmeralda = packageTier === 'esmeralda'
    const showGallery = hasPhotos && packageTier !== 'esmeralda'

    const sectionToggles = {
        showHero: true,
        showScratchReveal: packageTier === 'oro' || packageTier === 'rubi' || packageTier === 'cuarzo',
        showCountdown: true, // Incluido en TODOS los paquetes (Save The Date + Conteo)
        showMessage: true,
        showFamily: !isBronce && (eventType === 'wedding' || eventType === 'xv'),
        showPlaces: true,
        showGraduates: eventType === 'graduation',
        showDressCode: !isEsmeralda,
        showItinerary: true, // Incluido en Bronce, Platino, Oro, Rubí y Cuarzo
        showDetails: true,
        showGallery,
        showPresents: !isBronce && !isEsmeralda,
        showConfirmation: true,
        showFarewell: !isBronce,
        showTicket: hasTicketingSystem,
    }

    return {
        eventType,
        packageTier,
        hasPhotos,
        commercial: {
            packageName,
            basePrice,
            ticketPrice: ticketTotalPrice,
            addonsPrice: addonsTotalPrice,
            totalPrice: basePrice + ticketTotalPrice + addonsTotalPrice,
        },
        hasTicketingSystem,
        selectedAddons,
        sectionToggles,
    }
}
