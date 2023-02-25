import {ComponentType, SvelteComponentTyped} from 'svelte'
import {
    cancelable,
    Cancelable,
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

const elementId = 'wharfkit-web-ui'

export default class WebUIRenderer implements UserInterface {
    static version = '__ver' // replaced by build script

    public element: Element
    public shadow: ShadowRoot

    public modal?: Modal
    public displayed = false

    public cancelablePromises: ((reason: string) => void)[] = []

    constructor() {
        // Create the dialog element and its shadow root
        this.element = document.createElement('div')
        this.element.id = elementId
        this.shadow = this.element.attachShadow({mode: 'closed'})
        // Add listener to append to body
        document.addEventListener('DOMContentLoaded', () => this.appendDialogElement())
    }

    appendDialogElement() {
        const existing = document.getElementById(elementId)
        if (!existing) {
            document.body.append(this.element)
        }
    }

    // An array to store references to all active "cancel" callbacks for Cancelable promises
    registerCancelCallback(callback: any): void {
        this.cancelablePromises.push(callback)
    }

    // Execute all registered "cancel" callbacks and clear the array
    cancelCallbacks(reason: string) {
        console.log('calling cancelCallbacks')
        this.cancelablePromises.map((f) => f(reason))
        this.cancelablePromises = []
    }

    login(context: LoginContext): Cancelable<UserInterfaceLoginResponse> {
        const promise = cancelable(
            new Promise<UserInterfaceLoginResponse>((resolve, reject) => {
                new Modal({
                    target: this.shadow,
                    props: {
                        prompt: {
                            component: Login,
                            props: {
                                context,
                            },
                            abort: () => this.cancelCallbacks('aborting from modal close'),
                            cancel: async () => {
                                this.shadow.innerHTML = ''
                                reject('closed')
                            },
                            complete: async (event: CustomEvent<UserInterfaceLoginResponse>) => {
                                resolve(event.detail)
                            },
                        },
                    },
                })
            })
        )
        this.registerCancelCallback(promise.cancel)
        return promise
    }

    async onError(error: Error) {
        this.shadow.innerHTML = ''
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
            // close itself?
            this.shadow.innerHTML = ''
            new Modal({
                target: this.shadow,
                props: {},
            })
        }
        const promise: Cancelable<PromptResponse> = cancelable(
            new Promise((resolve, reject) => {
                new Modal({
                    target: this.shadow,
                    props: {
                        prompt: {
                            component: CustomPrompt,
                            props: {
                                title: args.title,
                                body: args.body,
                                components,
                            },
                            abort: () => this.cancelCallbacks('aborting from modal close'),
                            cancel: async (reason) => {
                                complete()
                                reject(reason)
                            },
                            complete: async (data) => {
                                complete()
                                resolve(data)
                            },
                        },
                    },
                })
            }),
            (canceled) => {
                complete()
                throw canceled
            }
        )
        this.registerCancelCallback(promise.cancel)
        return promise
    }

    status(message: string) {
        status(message)
    }
}
