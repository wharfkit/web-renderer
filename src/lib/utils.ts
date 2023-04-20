import type {ChainDefinition, WalletPluginMetadata} from '@wharfkit/session'
import type {ColorScheme} from '../types'
import {colorScheme} from '../ui/state'
import {get} from 'svelte/store'

export function isUrlImage(str: string) {
    return str.startsWith('http://') || str.startsWith('https://')
}

export function isBase64Image(str: string) {
    return str.startsWith('data:image/')
}

// Returns a themed logo based on the wallet metadata and the current color scheme preference
export function getThemedLogo(
    metadata: WalletPluginMetadata | ChainDefinition
): string | undefined {
    const {name, logo} = metadata
    const theme = get(colorScheme) as ColorScheme
    const oppositeColorScheme = theme === 'light' ? 'dark' : 'light'

    if (!logo) {
        if ('getLogo' in metadata) {
            return metadata.getLogo()?.[theme] ?? metadata.getLogo()?.[oppositeColorScheme]
        }
        console.warn(`${name} does not have a logo.`)
        return
    }

    if (!isUrlImage(logo.toString()) && !isBase64Image(logo.toString())) {
        console.warn(`${name} ${theme} logo is not a supported image format.`)
        return
    }

    return logo[theme] ?? logo[oppositeColorScheme]
}

export function getStoredColorScheme(): ColorScheme | null {
    return localStorage.getItem('colorScheme') as ColorScheme
}
