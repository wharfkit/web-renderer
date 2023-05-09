import type {ChainDefinition, WalletPluginMetadata} from '@wharfkit/session'
import {props} from 'src/ui/state'
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
    let {theme} = get(props)
    const oppositeTheme = theme === 'light' ? 'dark' : 'light'

    if (!theme) {
        // if no theme is set, use the system preference for logo
        window.matchMedia('(prefers-color-scheme: dark)').matches
            ? (theme = 'dark')
            : (theme = 'light')
    }

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

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getSetting = (key: string, defaultValue: any = undefined) => {
    const value = localStorage.getItem(key)
    return value !== null ? JSON.parse(value) : defaultValue
}

export const setSetting = (key: string, value: any) => {
    if (value === undefined) {
        clearSetting(key)
        return
    }
    localStorage.setItem(key, JSON.stringify(value))
}

export const clearSetting = (key: string) => {
    localStorage.removeItem(key)
}
