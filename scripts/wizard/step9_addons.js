import { ask, askConfirm, printSectionTitle } from './prompts.js'

export async function promptAddons(selectedAddons = {}) {
    printSectionTitle('9. Módulos Extra Add-ons')

    const addonsData = {
        lodgingAndWeather: {
            showLodging: Boolean(selectedAddons.lodgingAndWeather),
            title: 'Hospedaje & Clima',
            hotels: [],
            weatherCity: 'Aguascalientes',
        },
        ourStory: {
            showOurStory: Boolean(selectedAddons.ourStory),
            title: 'Nuestra Historia',
            quoteOrPoem: 'Por encima de todo, vístanse de amor.',
            timeline: [],
        },
        faqAndMenu: {
            showFaqAndMenu: Boolean(selectedAddons.faqAndMenu),
            title: 'Preguntas Frecuentes & Menú',
            faqs: [],
            menuCourses: [],
        },
        playlistAndPhotos: {
            showPlaylistAndPhotos: Boolean(selectedAddons.playlistAndPhotos),
            title: 'Música & Fotos de Invitados',
        },
        monogram: {
            showMonogram: Boolean(selectedAddons.monogram),
            title: 'Monograma del Evento',
        },
    }

    // 1. Hospedaje & Clima
    if (selectedAddons.lodgingAndWeather) {
        console.log('\n   -> Captura para Add-on Hospedaje & Clima:')
        const city = await ask('      -> Ciudad del evento para el clima', 'Aguascalientes')
        addonsData.lodgingAndWeather.weatherCity = city

        const addHotel = await askConfirm('      -> ¿Agregar información de hotel recomendado?', true)
        if (addHotel) {
            const hotelName = await ask('         -> Nombre del Hotel', 'Hotel Fiesta Americana')
            const address = await ask('         -> Dirección', 'Av. Juárez 50, Centro')
            const phone = await ask('         -> Teléfono de reservaciones', '449-123-4567')
            const rateInfo = await ask('         -> Información de tarifa / código', 'Código de descuento: BODA2026')

            addonsData.lodgingAndWeather.hotels.push({
                name: hotelName,
                address,
                phone,
                rateInfo,
            })
        }
    }

    // 2. Nuestra Historia
    if (selectedAddons.ourStory) {
        console.log('\n   -> Captura para Add-on Nuestra Historia / Cita:')
        const quote = await ask('      -> Poema, frase o cita especial', 'Por encima de todo, vístanse de amor.')
        addonsData.ourStory.quoteOrPoem = quote

        const addTimeline = await askConfirm('      -> ¿Agregar hito a la línea del tiempo?', true)
        if (addTimeline) {
            const dateStr = await ask('         -> Fecha o momento del hito', '15 de Octubre 2021')
            const milestoneTitle = await ask('         -> Título del hito', 'El Primer Café')
            const milestoneDesc = await ask('         -> Descripción', 'Nos conocimos en Coyoacán.')

            addonsData.ourStory.timeline.push({
                date: dateStr,
                title: milestoneTitle,
                description: milestoneDesc,
            })
        }
    }

    // 3. FAQ & Menú
    if (selectedAddons.faqAndMenu) {
        console.log('\n   -> Captura para Add-on Preguntas Frecuentes & Menú:')
        const addFaq = await askConfirm('      -> ¿Agregar una pregunta frecuente?', true)
        if (addFaq) {
            const q = await ask('         -> Pregunta', '¿Hay estacionamiento en el salón?')
            const a = await ask('         -> Respuesta', 'Sí, contamos con servicio de Valet Parking.')
            addonsData.faqAndMenu.faqs.push({ question: q, answer: a })
        }

        const addMenu = await askConfirm('      -> ¿Agregar tiempo del menú?', true)
        if (addMenu) {
            const course = await ask('         -> Tiempo (Entrada / Plato Fuerte / Postre)', 'Plato Fuerte')
            const dishName = await ask('         -> Nombre del platillo', 'Medallón de Filete a las Tres Pimientas')
            const description = await ask('         -> Descripción', 'Acompañado de puré rústico y espárragos.')
            addonsData.faqAndMenu.menuCourses.push({ course, name: dishName, description })
        }
    }

    return addonsData
}
