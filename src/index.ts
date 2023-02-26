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

import App, {state} from './ui/App.svelte'
import {UserInterfaceState} from './interfaces'

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

    public cancelablePromises: ((reason: string) => void)[] = []

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
        state.update((current: UserInterfaceState) => ({
            ...current,
            cancelablePromises: [...current.cancelablePromises, promise],
        }))

    log(...args: any[]) {
        // eslint-disable-next-line no-console
        console.log('WebUIRenderer:', ...args)
    }

    login(context: LoginContext): Cancelable<UserInterfaceLoginResponse> {
        this.log('login', context)
        const promise = cancelable(
            new Promise<UserInterfaceLoginResponse>((resolve, reject) => {
                state.update((current) => ({
                    ...current,
                    active: true,
                    path: 'login',
                    previousPaths: [...current.previousPaths, current.path],
                    props: {
                        id: 'login',
                        context,
                        reject,
                        resolve,
                    },
                }))
            })
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
        state.update((current) => ({
            ...current,
            active: true,
            path: 'error',
            previousPaths: [...current.previousPaths, current.path],
            props: {
                id: 'error',
                error,
            },
            title: 'An error occurred',
        }))
    }

    async onLogin() {
        this.log('onLogin')
        state.update((current) => ({
            ...current,
            active: true,
            previousPaths: [], // Reset paths
        }))
    }

    async onLoginResult() {
        this.log('onLoginResult')
        state.update((current) => ({
            ...current,
            active: false,
        }))
    }

    async onTransact() {
        this.log('onTransact')
        state.update((current) => ({
            ...current,
            active: true,
            path: 'transact',
            previousPaths: [], // Reset paths
        }))
    }

    async onTransactResult() {
        this.log('onTransactResult')
        state.update((current) => ({
            ...current,
            active: false,
        }))
    }

    prompt(args: PromptArgs): Cancelable<PromptResponse> {
        this.log('prompt', args)
        const promise = cancelable(
            new Promise<UserInterfaceLoginResponse>((resolve, reject) => {
                state.update((current) => ({
                    ...current,
                    active: true,
                    path: 'prompt',
                    previousPaths: [...current.previousPaths, current.path],
                    props: {
                        id: 'prompt',
                        prompt: args,
                        resolve,
                        reject,
                    },
                }))
            }),
            (canceled) => {
                throw canceled
            }
        )
        this.addCancelablePromise(promise.cancel)
        return promise
    }

    status(message: string) {
        this.log('status message', message)
        state.update((current) => ({
            ...current,
            active: true,
            title: message,
        }))
    }
}

export default WebUIRenderer
