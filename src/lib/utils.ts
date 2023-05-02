import type {ChainDefinition, WalletPluginMetadata} from '@wharfkit/session'
import type {Theme} from '../types'
import {theme as storedTheme} from '../ui/state'
import {get} from 'svelte/store'
import icons, {Icon} from '../ui/components/icons'

export function isUrlImage(str: string) {
    return str.startsWith('http://') || str.startsWith('https://')
}

export function isBase64Image(str: string) {
    return str.startsWith('data:image/')
}

export function isValidIcon(str: string): str is Icon {
    return str in icons
}

// Returns a themed logo based on the wallet metadata and the current color scheme preference
export function getThemedLogo(
    metadata: WalletPluginMetadata | ChainDefinition
): string | undefined {
    const {name, logo} = metadata
    const theme = get(storedTheme) as Theme
    const oppositeTheme = theme === 'light' ? 'dark' : 'light'

    if (!logo) {
        if ('getLogo' in metadata) {
            return metadata.getLogo()?.[theme] ?? metadata.getLogo()?.[oppositeTheme]
        }
        console.warn(`${name} does not have a logo.`)
        return
    }

    if (!isUrlImage(logo.toString()) && !isBase64Image(logo.toString())) {
        console.warn(`${name} ${theme} logo is not a supported image format.`)
        return
    }

    return logo[theme] ?? logo[oppositeTheme]
}

export function getStoredTheme(): Theme | null {
    return localStorage.getItem('theme') as Theme
}
