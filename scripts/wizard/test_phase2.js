import pc from 'picocolors'
import { promptProjectSetup } from './step0_project_setup.js'
import { promptPackageSelection } from './step1_package_selection.js'
import { promptThemeAndUI } from './step2_theme_ui.js'
import { promptHeroAndScratchReveal } from './step3_hero_sections.js'
import { closePrompts, printHeader } from './prompts.js'

async function runTestPhase2() {
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

        closePrompts()

        printHeader('REVISIÓN DE JSON GENERADO EN LA FASE 1 & FASE 2')

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

runTestPhase2()
