import React from 'react'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

export const DetailsSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const detailsConfig = sections.details

    if (detailsConfig?.showDetails === false) {
        return null
    }

    return (
        <section id="details" className="details-section">
            <div className="details-section__container">
                <SectionHeader
                    pretitle="Notas Importantes"
                    title={detailsConfig?.title || 'Recordatorios'}
                    align="center"
                />

                <div className="details-section__swiper-wrapper">

                </div>
            </div>
        </section>
    )
}



