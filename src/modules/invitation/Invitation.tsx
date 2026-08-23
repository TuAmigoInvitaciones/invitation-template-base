import React from 'react'
import { useMenu, useInvitationConfig } from '@/common/hooks'

import { HeroSection } from './hero/HeroSection'
import { CountdownSection } from './countdown/CountdownSection'
import { MessageSection } from './message/Message'
import { FamilySection } from './family/FamilySection'
import { PlacesSection } from './places/PlacesSection'
import { GraduatesSection } from './graduates/GraduatesSection'
import { DressCodeSection } from './dress-code/DressCodeSection'
import { ItinerarySection } from './itinerary/ItinerarySection'
import { DetailsSection } from './details/DetailsSection'
import { GallerySection } from './gallery/GallerySection'
import { PresentsSection } from './presents/PresentsSection'
import { ConfirmationSection } from './confirmation/ConfirmationSection'
import { RsvpSection } from './rsvp/RsvpSection'
import { FarewellSection } from './farewell/FarewellSection'

export const Invitation: React.FC = () => {
    const { activeVariant, isMenuVisible } = useMenu()
    const { eventType } = useInvitationConfig()

    const hasMenuBarClass = isMenuVisible && activeVariant === 'bar' ? 'invitation--has-menu-bar' : ''
    const containerClass = `invitation ${hasMenuBarClass}`.trim()

    const isGraduation = eventType === 'graduation'

    return (
        <main className={containerClass}>
            <HeroSection />
            <CountdownSection />
            <MessageSection />

            {/* RSVP en Graduaciones se renderiza antes del mapa para acceso rapido a boletos */}
            {isGraduation && <RsvpSection />}

            <FamilySection />
            <PlacesSection />
            <GraduatesSection />
            <DressCodeSection />
            <ItinerarySection />
            <DetailsSection />
            <GallerySection />
            <PresentsSection />
            <ConfirmationSection />

            {/* RSVP en Bodas, XV Años y otros eventos */}
            {!isGraduation && <RsvpSection />}

            <FarewellSection />
        </main>
    )
}
