import pc from 'picocolors'
import { promptProjectSetup } from './step0_project_setup.js'
import { promptPackageSelection } from './step1_package_selection.js'
import { promptThemeAndUI } from './step2_theme_ui.js'
import { promptHeroAndScratchReveal } from './step3_hero_sections.js'
import { promptMessageAndFamily } from './step4_message_family.js'
import { promptPlacesAndItinerary } from './step5_places_itinerary.js'
import { closePrompts, printHeader } from './prompts.js'

async function runTestPhase3() {
    try {
        const setup = await promptProjectSetup()
        const packageData = await promptPackageSelection()
        const themeAndUi = await promptThemeAndUI(
            'María & Carlos',
            packageData.packageTier !== 'esmeralda'
        )
        const heroData = await promptHeroAndScratchReveal(
            packageData.eventType,
            packageData.sectionToggles.showScratchReveal
        )
        const messageFamilyData = await promptMessageAndFamily(
            packageData.eventType,
            packageData.sectionToggles.showFamily
        )
        const placesItineraryData = await promptPlacesAndItinerary(
            heroData.eventDateRaw,
            '17:00 HRS',
            packageData.sectionToggles.showPlaces,
            packageData.sectionToggles.showItinerary
        )

        closePrompts()

        printHeader('REVISIÓN DE JSON GENERADO EN LAS FASES 1, 2 & 3')

        const resultJson = {
            eventType: packageData.eventType,
            packageTier: packageData.packageTier,
            commercial: packageData.commercial,
            theme: themeAndUi.theme,
            ui: themeAndUi.ui,
            config: {
                hasTicketingSystem: packageData.hasTicketingSystem,
                hasRSVP: true,
                hasMusic: themeAndUi.ui.music.show,
                hasMenu: themeAndUi.ui.menu.show,
            },
            sections: {
                envelop: {
                    showEnvelop: true,
                },
                hero: heroData.hero,
                scratchReveal: heroData.scratchReveal,
                message: messageFamilyData.message,
                family: messageFamilyData.family,
                places: placesItineraryData.places,
                itinerary: placesItineraryData.itinerary,
            },
            selectedAddons: packageData.selectedAddons,
            targetPath: setup.targetPath,
        }

        console.log(pc.cyan(JSON.stringify(resultJson, null, 2)))
    } catch (err) {
        console.error(err)
        closePrompts()
    }
}

runTestPhase3()
