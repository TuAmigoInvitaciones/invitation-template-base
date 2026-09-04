import React from 'react'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

export const FamilySection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const familyConfig = sections.family

    if (!familyConfig?.showFamily) {
        return null
    }

    return (
        <section id="family" className="family-section">
            <div className="family-section__container">
                <SectionHeader
                    pretitle="Con la Bendición de mis Padres"
                    title="Mi Familia"
                    align="center"
                />

                <div className="family-section__content">
                </div>
            </div>
        </section>
    )
}
