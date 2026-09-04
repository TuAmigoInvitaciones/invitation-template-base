import React from 'react'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

export const DressCodeSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const dressCodeConfig = sections.dressCode

    if (!dressCodeConfig?.showDressCode) {
        return null
    }

    return (
        <section id="dress-code" className="dress-code-section">
            <div className="dress-code-section__container">
                <SectionHeader
                    pretitle="Código de Vestimenta"
                    title={dressCodeConfig.title || 'Dress Code'}
                    align="center"
                />

                <div className="dress-code-section__content">
                </div>
            </div>
        </section>
    )
}
