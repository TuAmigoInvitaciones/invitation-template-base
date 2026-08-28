import React, { useRef, useState } from 'react'
import { useNavigation, useMusicPlayer } from '@/common/hooks'

export const Envelopeee: React.FC = () => {
    const timeoutRef = useRef<number | null>(null)
    const [isPlayStarted, setIsPlayStarted] = useState(false)
    const [showFlash, setShowFlash] = useState(false)
    const { goTo } = useNavigation()
    const { onPlayMusic } = useMusicPlayer()

    const triggerFlashAndNavigate = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
        setShowFlash(true)
        setTimeout(() => goTo('/invitation'), 1200)
    }

    const handleOpen = () => {
        if (isPlayStarted) return
        setIsPlayStarted(true)
        onPlayMusic()
        triggerFlashAndNavigate()
    }

    return (
        <div className="Envelopeee" onClick={handleOpen}>
            <div className="Envelopeee__card">
                <h1 className="Envelopeee__title">
                    Invitación Especial
                </h1>
                <p className="Envelopeee__subtitle">
                    Haz clic para abrir tu invitación
                </p>
            </div>

            {!isPlayStarted && (
                <div className="Envelopeee__indicator-ring" />
            )}

            {showFlash && (
                <div className="Envelopeee__flash-transition" />
            )}
        </div>
    )
}


