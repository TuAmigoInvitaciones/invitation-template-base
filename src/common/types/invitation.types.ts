import type { ButtonVariant } from './button.types'
import type { MenuVariant } from './menu.types'
import type { MusicPlayerVariant } from './music-player.types'

export type EventType = 'wedding' | 'graduation' | 'xv' | 'general'

export interface ThemeConfig {
    fontPack: number
    palette: number
    buttonVariant?: ButtonVariant
    menu?: {
        show?: boolean
        variant?: MenuVariant
        title?: string
        buttonVariant?: ButtonVariant
    }
    music?: {
        show?: boolean
        variant?: MusicPlayerVariant
        buttonVariant?: ButtonVariant
        songTitle?: string
        artistName?: string
    }
}

export interface SectionItemConfig {
    title?: string
    [key: string]: unknown
}

export interface LocationItem {
    title?: string
    location?: string
    time?: string
    date?: string
    url?: string
}

export interface SectionsConfig {
    hero?: SectionItemConfig & { showHero?: boolean; names?: string; subtitle?: string; date?: string }
    message?: SectionItemConfig & { showMessage?: boolean; message?: string }
    countdown?: SectionItemConfig & { showCountdown?: boolean; targetDate?: string }
    family?: SectionItemConfig & { showFamily?: boolean }
    places?: SectionItemConfig & { showPlaces?: boolean; locations?: LocationItem[] }
    graduates?: SectionItemConfig & { showGraduates?: boolean }
    itinerary?: SectionItemConfig & { 
        showItinerary?: boolean;
        itinerary?: Array<{ time?: string; event?: string }>
    }
    dressCode?: SectionItemConfig & { 
        showDressCode?: boolean; 
        title?: string;
        description?: string;
        attire?: { men?: string; women?: string };
        colors?: { suggested?: string[]; avoid?: string[] }
    }
    details?: SectionItemConfig & { showDetails?: boolean }
    gallery?: SectionItemConfig & { showGallery?: boolean }
    presents?: SectionItemConfig & { showPresents?: boolean; title?: string; url?: string }
    confirmation?: SectionItemConfig & { showConfirmation?: boolean }
    rsvp?: SectionItemConfig & { showRsvp?: boolean }
    farewell?: SectionItemConfig & { showFarewell?: boolean }
    [key: string]: unknown
}

export interface InvitationConfigState {
    eventType?: EventType
    theme: ThemeConfig
    config: Record<string, boolean>
    sections: SectionsConfig
}
