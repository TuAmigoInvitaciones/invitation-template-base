import pc from 'picocolors'
import { promptProjectSetup } from './step0_project_setup.js'
import { promptPackageSelection } from './step1_package_selection.js'
import { closePrompts, printHeader } from './prompts.js'

async function runTestPhase1() {
    try {
        const setup = await promptProjectSetup()
        const packageData = await promptPackageSelection()

        closePrompts()

        printHeader('🔍 REVISIÓN DE JSON GENERADO EN LA FASE 1')

        const resultJson = {
            eventType: packageData.eventType,
            packageTier: packageData.packageTier,
            commercial: packageData.commercial,
            config: {
                hasTicketingSystem: packageData.hasTicketingSystem,
                hasRSVP: true,
                hasMusic: true,
                hasMenu: true,
            },
            sectionToggles: packageData.sectionToggles,
            selectedAddons: packageData.selectedAddons,
            targetPath: setup.targetPath,
        }

        console.log(pc.cyan(JSON.stringify(resultJson, null, 2)))
    } catch (err) {
        console.error(err)
        closePrompts()
    }
}

runTestPhase1()
