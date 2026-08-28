import { ask, askConfirm, printSectionTitle } from './prompts.js'

export async function promptProtocolAndPresents(showDressCodeDefault = true, showPresentsDefault = true) {
    printSectionTitle('6. CÃ³digo de Vestimenta & Mesa de Regalos')

    // 1. CÃ³digo de Vestimenta
    const showDressCode = await askConfirm('   -> Â¿Incluir secciÃ³n de CÃ³digo de Vestimenta?', showDressCodeDefault)
    let dressCodeData = {
        showDressCode,
    }

    if (showDressCode) {
        const title = await ask('      -> TÃ­tulo de la secciÃ³n', 'CÃ³digo de Vestimenta')
        const description = await ask('      -> DescripciÃ³n general', 'Te sugerimos vestir de etiqueta semi-formal.')
        const menAttire = await ask('      -> RecomendaciÃ³n para Hombres', 'Traje oscuro y corbata.')
        const womenAttire = await ask('      -> RecomendaciÃ³n para Mujeres', 'Vestido largo o de noche.')

        const suggestedStr = await ask('      -> Colores sugeridos (separados por coma)', 'negro, azul marino')
        const avoidStr = await ask('      -> Colores a evitar (separados por coma)', 'blanco, beige')

        dressCodeData = {
            showDressCode: true,
            title,
            description,
            attire: {
                men: menAttire,
                women: womenAttire,
            },
            colors: {
                suggested: suggestedStr.split(',').map(s => s.trim()).filter(Boolean),
                avoid: avoidStr.split(',').map(s => s.trim()).filter(Boolean),
            },
        }
    }

    // 2. Detalles Importantes / Notas del Evento
    const showDetails = await askConfirm('   -> Â¿Incluir secciÃ³n de Detalles Importantes (No NiÃ±os, Puntualidad, Hashtag)?', true)
    let detailsData = {
        showDetails,
    }

    if (showDetails) {
        const title = await ask('      -> TÃ­tulo de la secciÃ³n', 'Detalles Importantes')
        const noKids = await askConfirm('      -> Â¿Activar aviso "No NiÃ±os" / Evento de Adultos?', true)
        let noKidsMessage = ''
        if (noKids) {
            noKidsMessage = await ask('         -> Mensaje No NiÃ±os', 'Aunque amamos a los pequeÃ±os, esta recepciÃ³n es solo para adultos.')
        }

        const punctuality = await askConfirm('      -> Â¿Activar aviso de Puntualidad?', true)
        let punctualityMessage = ''
        if (punctuality) {
            punctualityMessage = await ask('         -> Mensaje de Puntualidad', 'Te sugerimos llegar con 15 minutos de anticipaciÃ³n para no perderte ningÃºn momento.')
        }

        const hashtag = await ask('      -> Hashtag oficial del evento', '#GrethelStefaniaXV')

        detailsData = {
            showDetails: true,
            title,
            noKids,
            noKidsMessage,
            punctuality,
            punctualityMessage,
            hashtag,
        }
    }

    // 3. Mesa de Regalos / Datos Bancarios
    const showPresents = await askConfirm('   -> Â¿Incluir secciÃ³n de Mesa de Regalos / Lluvia de Sobres?', showPresentsDefault)
    let presentsData = {
        showPresents,
    }

    if (showPresents) {
        const title = await ask('      -> TÃ­tulo de la secciÃ³n', 'Mesa de Regalos & Lluvia de Sobres')
        const url = await ask('      -> URL / Enlace de la mesa de regalos (Liverpool, Amazon, etc.)', 'https://mesaderegalos.liverpool.com.mx')

        const hasBankDetails = await askConfirm('      -> Â¿Incluir datos bancarios para transferencias?', true)
        let bankDetails = {
            bank: '',
            account: '',
            clabe: '',
            holder: '',
        }

        if (hasBankDetails) {
            const bank = await ask('         -> Banco', 'BBVA')
            const holder = await ask('         -> Titular de la cuenta', 'MarÃ­a Morales')
            const clabe = await ask('         -> CLABE interbancaria', '012180012345678901')
            const account = await ask('         -> NÃºmero de cuenta o tarjeta', '1234567890')
            bankDetails = { bank, holder, clabe, account }
        }

        const envelopeeeRain = await askConfirm('      -> Â¿Mencionar modalidad de Lluvia de Sobres?', true)

        presentsData = {
            showPresents: true,
            title,
            url,
            bankDetails,
            envelopeeeRain,
        }
    }

    return {
        dressCode: dressCodeData,
        details: detailsData,
        presents: presentsData,
    }
}


