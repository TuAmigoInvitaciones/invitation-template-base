import React, { useRef, useState } from 'react'
import { useNavigation, useMusicPlayer } from '@/common/hooks'
import envelopVideo from '@/assets/videos/envelop-video.mp4'

export const EnvelopeVideo: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const timeoutRef = useRef<number | null>(null)
    const [isPlayStarted, setIsPlayStarted] = useState(false)
    const { goTo } = useNavigation()
    const { onPlayMusic } = useMusicPlayer()

    const handleOpen = () => {
        if (isPlayStarted) return
        setIsPlayStarted(true)
        onPlayMusic()

        timeoutRef.current = window.setTimeout(() => {
            goTo('/invitation')
        }, 5000)

        if (videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.error('Error attempting to play video:', error)
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                }
                goTo('/invitation')
            })
        } else {
            goTo('/invitation')
        }
    }

    const handleVideoEnded = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        goTo('/invitation')
    }

    return (
        <div
            className="envelope envelope--video"
            onClick={handleOpen}
        >
            <video
                ref={videoRef}
                src={envelopVideo}
                playsInline
                {...{ 'webkit-playsinline': 'true' }}
                controls={false}
                muted
                preload="auto"
                className="envelope__video"
                onEnded={handleVideoEnded}
            />

            {!isPlayStarted && (
                <div className="envelope__indicator-ring envelope__indicator-ring--video animate-pulse-seal-ring" />
            )}
        </div>
    )
}
