import {
    Cancelable,
    cancelable,
    Canceled,
    LoginContext,
    PromptArgs,
    PromptResponse,
    UserInterface,
    UserInterfaceLoginResponse,
} from '@wharfkit/session'

import App from './ui/App.svelte'

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
} from './ui/state'

export interface WebUIRendererOptions {
    id?: string
}

export const defaultWebUIRendererOptions = {
    id: 'wharfkit-web-ui',
}

export class WebUIRenderer implements UserInterface {
    static version = '__ver' // replaced by build script

    public elementId = 'wharfkit-web-ui'
    public element: Element
    public shadow: ShadowRoot

    constructor(options: WebUIRendererOptions = defaultWebUIRendererOptions) {
        // Create the dialog element and its shadow root
        this.element = document.createElement('div')
        this.elementId = options.id || defaultWebUIRendererOptions.id
        this.element.id = this.elementId
        this.shadow = this.element.attachShadow({mode: 'closed'})
        // Add listener to append to body
        document.addEventListener('DOMContentLoaded', () => this.appendDialogElement())
    }

    appendDialogElement() {
        const existing = document.getElementById(this.elementId)
        if (!existing) {
            document.body.append(this.element)
            document.removeEventListener('DOMContentLoaded', () => this.appendDialogElement())
            new App({
                target: this.shadow,
                props: {},
            })
        }
    }

    // Add every cancelable promise to the list of cancelable promises
    addCancelablePromise = (promise) =>
        cancelablePromises.update((current) => [...current, promise])

    log(...args: any[]) {
        // eslint-disable-next-line no-console
        console.log('WebUIRenderer, LOG:', ...args)
    }

    login(context: LoginContext): Cancelable<UserInterfaceLoginResponse> {
        this.log('login', context)
        active.set(true)
        router.push('login')
        loginContext.set(context)
        const promise = cancelable(
            new Promise<UserInterfaceLoginResponse>((resolve, reject) =>
                loginPromise.set({
                    reject,
                    resolve,
                })
            )
        )
        this.addCancelablePromise(promise.cancel)
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
        // Set the title/subtitle to match the error state
        props.update((current) => ({
            ...current,
            title: 'Error',
            subtitle: 'An error has occurred.',
        }))
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
            title: 'Login',
            subtitle: 'Please login to continue.',
        }))
        // Push the new path to the router
        router.push('login')
    }

    async onLoginResult() {
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
            title: 'Transact',
            subtitle: '',
        }))
        // Push the new path to the router
        router.push('transact')
    }

    async onTransactResult() {
        this.log('onTransactResult')
        // Reset all data in the state
        resetState()
        // Close the dialog once the transact completes
        active.set(false)
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
}

export default WebUIRenderer
