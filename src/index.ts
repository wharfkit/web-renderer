import {ComponentType, SvelteComponentTyped} from 'svelte'
import {
    cancelable,
    Cancelable,
    Canceled,
    PromptArgs,
    PromptResponse,
    UserInterfaceLoginResponse,
} from '@wharfkit/session'
import {LoginContext, LoginOptions, UserInterface} from '@wharfkit/session'

import {status} from './components/Modal'

import Accept from './components/Accept.svelte'
import Asset from './components/Asset.svelte'
import Button from './components/Button.svelte'
import CustomPrompt from './components/CustomPrompt.svelte'
import Countdown from './components/Countdown.svelte'
import ErrorMessage from './components/Error.svelte'
import Modal from './components/Modal.svelte'
import Qr from './components/Qr.svelte'

import Login from './login/App.svelte'

export default class WebUIRenderer implements UserInterface {
    static version = '__ver' // replaced by build script

    public elementId = 'wharfkit-web-ui'
    public element: Element
    public shadow: ShadowRoot

    public cancelablePromises: ((reason: string) => void)[] = []

    constructor(elementId = 'wharfkit-web-ui') {
        // Create the dialog element and its shadow root
        this.element = document.createElement('div')
        this.elementId = elementId
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
        }
    }

    // An array to store references to all active "cancel" callbacks for Cancelable promises
    registerCancelCallback(callback: any): void {
        this.cancelablePromises.push(callback)
    }

    // Execute all registered "cancel" callbacks and clear the array
    cancelCallbacks(reason: string, silent = false) {
        this.cancelablePromises.map((f) => f(reason, silent))
        this.cancelablePromises = []
    }

    createModal(component, props, resolve, reject) {
        new Modal({
            target: this.shadow,
            props: {
                prompt: {
                    component,
                    props,
                    abort: () => this.cancelCallbacks('Aborting, modal closed.', true),
                    cancel: async () => reject('closed'),
                    complete: async (event: CustomEvent<UserInterfaceLoginResponse>) => {
                        resolve(event.detail)
                    },
                },
            },
        })
    }

    destroyModal() {
        this.shadow.innerHTML = ''
    }

    login(context: LoginContext): Cancelable<UserInterfaceLoginResponse> {
        const promise = cancelable(
            new Promise<UserInterfaceLoginResponse>((resolve, reject) => {
                this.createModal(Login, {context}, resolve, reject)
            })
        )
        this.registerCancelCallback(promise.cancel)
        return promise
    }

    async onError(error: Error) {
        // Reset the shadow element
        this.destroyModal()
        // Determine if this was a silent/cancelable error
        const isCancelable = error instanceof Canceled
        const isSilent = isCancelable && error.silent === true
        // If it was, don't display the error
        if (isSilent) {
            return
        }
        // Display the error
        new Modal({
            target: this.shadow,
            props: {
                prompt: {
                    component: ErrorMessage,
                    props: {
                        error,
                    },
                    cancel: () => {},
                    complete: () => {},
                },
            },
        })
    }

    async onLogin() {
        this.shadow.innerHTML = ''
    }

    async onLoginResult() {
        this.shadow.innerHTML = ''
    }

    async onTransact() {
        this.shadow.innerHTML = ''
        new Modal({
            target: this.shadow,
            props: {},
        })
    }

    async onTransactResult() {
        status('Transaction complete!')
    }

    prompt(args: PromptArgs): Cancelable<PromptResponse> {
        this.shadow.innerHTML = ''
        const components: {
            component: ComponentType<SvelteComponentTyped>
            props: Record<string, unknown>
        }[] = []
        args.elements.forEach((element) => {
            switch (element.type) {
                case 'accept': {
                    components.push({
                        component: Accept,
                        props: {
                            data: element.data,
                        },
                    })
                    break
                }
                case 'asset': {
                    components.push({
                        component: Asset,
                        props: {
                            data: element.data,
                        },
                    })
                    break
                }
                case 'button': {
                    components.push({
                        component: Button,
                        props: {
                            data: element.data,
                            label: element.label,
                        },
                    })
                    break
                }
                case 'qr': {
                    components.push({
                        component: Qr,
                        props: {
                            data: element.data,
                        },
                    })
                    break
                }
                case 'countdown': {
                    components.push({
                        component: Countdown,
                        props: {
                            data: element.data,
                        },
                    })
                    break
                }
                default: {
                    throw new Error(`Unknown element type: ${element.type}`)
                }
            }
        })
        const complete = () => {
            this.destroyModal()
            new Modal({
                target: this.shadow,
                props: {},
            })
        }
        const promise: Cancelable<PromptResponse> = cancelable(
            new Promise((resolve, reject) =>
                this.createModal(
                    CustomPrompt,
                    {
                        title: args.title,
                        body: args.body,
                        components,
                    },
                    resolve,
                    reject
                )
            ),
            (canceled) => {
                complete()
                throw canceled
            }
        )
        this.registerCancelCallback(promise.cancel)
        return promise
    }

    status(message: string) {
        console.log('status message', message)
        status(message)
    }
}
