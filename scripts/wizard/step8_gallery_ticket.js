import { ask, askSelect, askConfirm, printSectionTitle } from './prompts.js'

export async function promptGalleryAndTicket(showGalleryDefault = true, showTicketDefault = false) {
    printSectionTitle('8. Galería de Fotos & Módulo Boletaje')

    // 1. Galería de Fotos
    const showGallery = await askConfirm('   -> ¿Incluir sección de Galería de Fotos?', showGalleryDefault)
    let galleryData = {
        showGallery,
    }

    if (showGallery) {
        const title = await ask('      -> Título de la galería', 'Galería de Fotos')
        const variant = await askSelect('      -> Formato de visualización de fotos:', [
            { label: 'Carrusel Deslizante (Slider)', value: 'slider' },
            { label: 'Mosaico Responsivo (Mosaic)', value: 'mosaic' },
            { label: 'Collage Creativo (Collage)', value: 'collage' },
        ])

        galleryData = {
            showGallery: true,
            title,
            variant,
            maxPhotos: 6,
        }
    }

    // 2. Ticket / Boletaje
    return {
        gallery: galleryData,
        ticket: {
            showTicket: showTicketDefault,
        },
    }
}
