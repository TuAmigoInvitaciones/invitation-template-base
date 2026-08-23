import React from 'react'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

export const ConfirmationSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const confirmationConfig = sections.confirmation

    if (!confirmationConfig?.showConfirmation) {
        return null
    }

    return (
        <section id="confirmation" className="confirmation-section">
            <div className="confirmation-section__container">

                <div className="confirmation-section__header">
                    <SectionHeader
                        pretitle="CONFIRMACIÓN"
                        title="Asistencia"
                        align="center"
                        variant="uppercase"
                    />
                </div>

                <div className="confirmation-section__content">
                    {/* Contenedor preparado para la sección de confirmación de asistencia */}
                </div>
            </div>
        </section>
    )
}
