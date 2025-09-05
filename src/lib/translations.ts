import {NameType, PublicKeyType} from '@wharfkit/antelope'
import i18n, {Config, Parser} from 'sveltekit-i18n'

import lang from './translations/lang.json'

import en from './translations/en/common.json'
import ko from './translations/ko/common.json'
import zh_hans from './translations/zh-hans/common.json'
import zh_hant from './translations/zh-hant/common.json'
import tr from './translations/tr/common.json'

const translations = {
    en: {...lang, ...en},
    ko: {...lang, ...ko},
    'zh-Hans': {...lang, ...zh_hans},
    'zh-Hant': {...lang, ...zh_hant},
    tr: {...lang, ...tr},
}

const ZH_LANGUAGE_MAPPINGS: Record<string, string> = {
    zh: 'zh-Hans',
    'zh-cn': 'zh-Hans',
    'zh-sg': 'zh-Hans',
    'zh-hans': 'zh-Hans',
    'zh-tw': 'zh-Hant',
    'zh-hk': 'zh-Hant',
    'zh-hant': 'zh-Hant',
}

interface Params {
    appName?: NameType
    name?: NameType
    publicKey?: PublicKeyType
}

const config: Config<Params> = {
    initLocale: 'en',
    translations,
}

interface UserInterfaceLocalizationOptions {
    translations?: Record<string, Record<string, string>>
}

export type i18nType = i18n<Parser.Params<Params, object>, Params, object>

export const makeLocalization = (options: UserInterfaceLocalizationOptions = {}): i18nType => {
    const params: Config<Params> = {
        ...config,
        ...options,
    }
    return new i18n(params)
}

export function mapChineseLanguage(lang: string): string {
    if (!lang) return 'zh-Hans'
    const lowerLang = lang.toLowerCase().trim()
    return ZH_LANGUAGE_MAPPINGS[lowerLang] || 'zh-Hans'
}

export const {t, l, locales, locale, loadTranslations, setLocale} = new i18n(config)
