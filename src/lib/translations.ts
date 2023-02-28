import {NameType, PublicKeyType} from '@greymass/eosio'
import i18n, {Config, Parser} from 'sveltekit-i18n'

import lang from './translations/lang.json'

import en from './translations/en/common.json'
import ko from './translations/ko/common.json'
import zh from './translations/zh/common.json'

const translations = {
    en: {...lang, ...en},
    ko: {...lang, ...ko},
    zh: {...lang, ...zh},
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

export const {t, l, locales, locale, loadTranslations} = new i18n(config)
