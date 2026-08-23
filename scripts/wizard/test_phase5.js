import pc from 'picocolors'
import { promptProjectSetup } from './step0_project_setup.js'
import { promptPackageSelection } from './step1_package_selection.js'
import { promptThemeAndUI } from './step2_theme_ui.js'
import { promptHeroAndScratchReveal } from './step3_hero_sections.js'
import { promptMessageAndFamily } from './step4_message_family.js'
import { promptPlacesAndItinerary } from './step5_places_itinerary.js'
import { promptProtocolAndPresents } from './step6_protocol_presents.js'
import { promptConfirmationAndGraduates } from './step7_confirmation_graduates.js'
import { promptGalleryAndTicket } from './step8_gallery_ticket.js'
import { promptAddons } from './step9_addons.js'
import { promptFarewell } from './step10_farewell.js'
import { closePrompts, printHeader } from './prompts.js'

async function runTestPhase5() {
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
        const protocolPresentsData = await promptProtocolAndPresents(
            packageData.sectionToggles.showDressCode,
            packageData.sectionToggles.showPresents
        )
        const confirmationGraduatesData = await promptConfirmationAndGraduates(
            packageData.eventType,
            packageData.sectionToggles.showGraduates
        )
        const galleryTicketData = await promptGalleryAndTicket(
            packageData.sectionToggles.showGallery,
            packageData.hasTicketingSystem
        )
        const addonsData = await promptAddons(packageData.selectedAddons)
        const farewellData = await promptFarewell(heroData.hero.names)

        closePrompts()

        printHeader('REVISIÓN DEL MANIFIESTO FINAL INVITATION.CONFIG.JSON')

        const finalConfigManifest = {
            eventType: packageData.eventType,
            packageTier: packageData.packageTier,
            commercial: packageData.commercial,
            theme: themeAndUi.theme,
            ui: themeAndUi.ui,
            config: {
                hasTicketingSystem: packageData.hasTicketingSystem,
                hasRSVP: confirmationGraduatesData.confirmation.showConfirmation,
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
                dressCode: protocolPresentsData.dressCode,
                presents: protocolPresentsData.presents,
                confirmation: confirmationGraduatesData.confirmation,
                graduates: confirmationGraduatesData.graduates,
                gallery: galleryTicketData.gallery,
                ticket: galleryTicketData.ticket,
                addons: addonsData,
                farewell: farewellData,
            },
            targetPath: setup.targetPath,
        }

        console.log(pc.cyan(JSON.stringify(finalConfigManifest, null, 2)))
    } catch (err) {
        console.error(err)
        closePrompts()
    }
}

runTestPhase5()
