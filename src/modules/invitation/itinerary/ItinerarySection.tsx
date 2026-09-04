import React from 'react'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

export const ItinerarySection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const itineraryConfig = sections.itinerary

    if (!itineraryConfig?.showItinerary) {
        return null
    }

    return (
        <section id="itinerary" className="itinerary-section">
            <div className="itinerary-section__container">
                <SectionHeader
                    pretitle="Cronograma"
                    title="Itinerario del Evento"
                    align="center"
                />

                <div className="itinerary-section__content">
                    Itinerario
                </div>
            </div>
        </section>
    )
}
