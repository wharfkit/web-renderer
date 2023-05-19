import {
    AbstractUserInterface,
    Cancelable,
    cancelable,
    Canceled,
    LoginContext,
    PromptArgs,
    PromptResponse,
    UserInterface,
    UserInterfaceLoginResponse,
    UserInterfaceTranslateOptions,
} from '@wharfkit/session'

import App from './ui/App.svelte'
import {makeLocalization} from './lib/translations'

import {
    active,
    cancelablePromises,
    errorDetails,
    loginContext,
    loginPromise,
    prompt,
    props,
    resetState,
    router,
    settings,
} from './ui/state'
import {get} from 'svelte/store'

export interface WebRendererOptions {
    id?: string
    translations?: Record<string, Record<string, string>>
}

export const defaultWebRendererOptions = {
    id: 'wharfkit-web-ui',
}

const getNavigatorLanguage = () =>
    (navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language || 'en'
    ).split('-')[0]

export class WebRenderer extends AbstractUserInterface implements UserInterface {
    static version = '__ver' // replaced by build script

    public elementId = 'wharfkit-web-ui'
    public element: Element
    public shadow: ShadowRoot

    public i18n

    constructor(options: WebRendererOptions = defaultWebRendererOptions) {
        super()
        // Create the dialog element and its shadow root
        this.element = document.createElement('div')
        this.elementId = options.id || defaultWebRendererOptions.id
        this.element.id = this.elementId
        this.shadow = this.element.attachShadow({mode: 'closed'})
        // Load translations for the current locale
        this.i18n = makeLocalization()
        let lang = getNavigatorLanguage()
        const settingsLanguage = get(settings).language
        if (settingsLanguage) {
            lang = settingsLanguage
        }
        this.log(`Setting language to ${lang}`)
        settings.update((current) => ({...current, language: lang}))
        this.i18n.loadTranslations(lang)
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            // Document is ready, append element
            this.appendDialogElement()
        } else {
            // Add listener to append to body
            document.addEventListener('DOMContentLoaded', () => this.appendDialogElement())
        }
    }

    appendDialogElement() {
        const existing = document.getElementById(this.elementId)
        if (!existing) {
            document.body.append(this.element)
            document.removeEventListener('DOMContentLoaded', () => this.appendDialogElement())
            new App({
                target: this.shadow,
                props: {
                    i18n: this.i18n,
                },
            })
        }
    }

    // Add every cancelable promise to the list of cancelable promises
    addCancelablePromise = (promise) =>
        cancelablePromises.update((current) => [...current, promise])

    log(...args: any[]) {
        // eslint-disable-next-line no-console
        console.log('WebRenderer, LOG:', ...args)
    }

    login(context: LoginContext): Cancelable<UserInterfaceLoginResponse> {
        this.log('login', context)
        active.set(true)
        router.push('login')
        const promise = cancelable(
            new Promise<UserInterfaceLoginResponse>((resolve, reject) =>
                loginPromise.set({
                    reject,
                    resolve,
                })
            )
        )
        this.addCancelablePromise(promise.cancel)
        loginContext.set(context)
        return promise
    }

    async onError(error: Error) {
        // Determine if this was a silent/cancelable error
        const isCancelable = error instanceof Canceled
        const isSilent = isCancelable && error.silent === true
        this.log('onError', {
            isCancelable,
            isSilent,
            error,
        })
        // If it was, don't display the error
        if (isSilent) {
            return
        }
        // Make sure the dialog is active
        active.set(true)
        // Set the error state
        errorDetails.set(String(error))
        // Push the new path to the router
        router.push('error')
    }

    async onLogin() {
        this.log('onLogin')
        // Make sure the dialog is active
        active.set(true)
        // Set the title/subtitle to match the login state
        props.update((current) => ({
            ...current,
            title: this.i18n.t.get('login.title', {default: 'Login'}),
            subtitle: '',
        }))
        // Push the new path to the router
        router.push('login')
    }

    async onLoginComplete() {
        this.log('onLoginResult')
        // Close the dialog once the login completes
        active.set(false)
        // Reset all data in the state
        resetState()
    }

    async onTransact() {
        this.log('onTransact')
        // Make sure the dialog is active
        active.set(true)
        // Set the title/subtitle to match the transact state
        props.update((c) => ({
            ...c,
            title: this.i18n.t.get('transact.title', {default: 'Transact'}),
            subtitle: '',
        }))
        // Push the new path to the router
        router.push('transact')
    }

    async onTransactComplete() {
        this.log('onTransactResult')
        // Reset all data in the state
        resetState()
        // Close the dialog once the transact completes
        active.set(false)
    }

    async onSign(): Promise<void> {
        this.log('onSign')
    }

    async onSignComplete(): Promise<void> {
        this.log('onSignComplete')
    }

    async onBroadcast(): Promise<void> {
        this.log('onBroadcast')
    }

    async onBroadcastComplete(): Promise<void> {
        this.log('onBroadcastComplete')
    }

    prompt(args: PromptArgs): Cancelable<PromptResponse> {
        this.log('prompt', args)
        // Make sure the dialog is active
        active.set(true)
        // Push the new path to the router
        router.push('prompt')
        // Setup the promise to return to the session kit
        const promise = cancelable(
            new Promise<UserInterfaceLoginResponse>((resolve, reject) => {
                prompt.set({
                    args,
                    resolve,
                    reject,
                })
            }),
            (canceled) => {
                throw canceled
            }
        )
        // Save a copy of the promise to reference if canceled
        this.addCancelablePromise(promise.cancel)
        // Return the promise to the session kit
        return promise
    }

    status(message: string) {
        // Make sure the dialog is active
        active.set(true)
        // Update the subtitle to match the message
        props.update((current) => ({
            ...current,
            subtitle: message,
        }))
    }

    // Map the UserInterface translate call to our i18n instance
    translate(key: string, options?: UserInterfaceTranslateOptions, namespace?: string) {
        if (namespace) {
            return this.i18n.t.get(`${namespace}.${key}`, options)
        }
        return this.i18n.t.get(key, options)
    }

    addTranslations(translations) {
        this.i18n.addTranslations(translations)
    }
}

export default WebRenderer
