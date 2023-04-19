import type {UserInterfaceWalletPlugin} from '@wharfkit/session'
import type {ColorScheme} from '../types'

export function isBase64Image(str: string | undefined): boolean {
    if (!str) return false
    const regex = /^data:image\/(jpeg|png|gif|bmp|svg\+xml);base64,([^\s]*)$/
    return regex.test(str)
}

//function to test a valid url of an image
export function isUrlImage(str: string | undefined): boolean {
    if (!str) return false
    const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
    return regex.test(str)
}

// Returns a themed logo based on the wallet metadata and the current color scheme preference
export function getThemedLogo(
    wallet: UserInterfaceWalletPlugin,
    $colorScheme: ColorScheme
): string | undefined {
    const {logo, name} = wallet.metadata ?? {}
    if (!logo) {
        console.warn(`${name} does not have a logo.`)
        return
    }
    const oppositeColorScheme = $colorScheme === 'light' ? 'dark' : 'light'
    const themedLogo: string = logo[$colorScheme] ?? logo[oppositeColorScheme]
    if (isBase64Image(themedLogo) || isUrlImage(themedLogo)) {
        return themedLogo
    }
    console.warn(`${name} ${$colorScheme} logo is not a supported image format.`)
}

export function getStoredColorScheme(): ColorScheme | null {
    return localStorage.getItem('colorScheme') as ColorScheme
}
