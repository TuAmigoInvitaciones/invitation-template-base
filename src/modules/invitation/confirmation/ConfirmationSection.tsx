import React from 'react'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import { ConfirmationSectionForm } from './ConfirmationSectionForm'

export const ConfirmationSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const confirmationConfig = sections.confirmation

    if (!confirmationConfig?.showConfirmation) {
        return null
    }

    const isQuantityFree = Boolean(confirmationConfig?.isQuantityFree)

    return (
        <section id="confirmation" className="confirmation-section">
            <div className="confirmation-section__container">
                <SectionHeader
                    pretitle="Confirmación de Asistencia"
                    title="¿Nos Acompañas?"
                    align="center"
                />

                <div className="confirmation-section__content">
                    <ConfirmationSectionForm isQuantityFree={isQuantityFree} />
                </div>
            </div>
        </section>
    )
}
