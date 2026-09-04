import React from 'react'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

export const GallerySection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const galleryConfig = sections.gallery

    if (!galleryConfig?.showGallery) {
        return null
    }

    return (
        <section id="gallery" className="gallery-section">
            <div className="gallery-section__container">
                <SectionHeader
                    pretitle="Momentos Especiales"
                    title="Galería de Fotos"
                    align="center"
                />

                <div className="gallery-section__content">
                    Galería
                </div>
            </div>
        </section>
    )
}
