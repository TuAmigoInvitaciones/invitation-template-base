import React from 'react'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

export const GuestPhotosSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const guestPhotosConfig = sections.guestPhotos
    const playlistAndPhotosConfig = sections.addons?.playlistAndPhotos

    const show = guestPhotosConfig?.showGuestPhotos ?? playlistAndPhotosConfig?.showPlaylistAndPhotos

    if (show === false) {
        return null
    }

    return (
        <section id="guest-photos" className="guest-photos-section">
            <div className="guest-photos-section__container">
                <div className="guest-photos-section__header">
                    <SectionHeader
                        pretitle="Recuerdos"
                        title={guestPhotosConfig?.title || 'Álbum de Fotos'}
                    />
                </div>

            </div>
        </section>
    )
}


