import {ComponentType, SvelteComponentTyped} from 'svelte'
import {UserInterfaceLoginResponse} from '@wharfkit/session'
import {LoginContext, LoginOptions, UserInterface} from '@wharfkit/session'

import {status} from './components/Modal'

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

    async login(context: LoginContext): Promise<UserInterfaceLoginResponse> {
        const loginResponse = await new Promise<UserInterfaceLoginResponse>((resolve, reject) => {
            new Modal({
                target: this.shadow,
                props: {
                    prompt: {
                        component: Login,
                        props: {
                            context,
                        },
                        cancel: async () => reject(),
                        complete: async (event: CustomEvent<UserInterfaceLoginResponse>) => {
                            resolve(event.detail)
                        },
                    },
                },
            })
        })
        return loginResponse
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

    prompt(args) {
        this.shadow.innerHTML = ''
        const components: {
            component: ComponentType<SvelteComponentTyped>
            props: Record<string, unknown>
        }[] = []
        args.elements.forEach((element) => {
            switch (element.type) {
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
        new Promise<number>((resolve, reject) => {
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
                        cancel: async () => reject(),
                        complete: async (data) => resolve(data),
                    },
                },
            })
        })
    }

    status(message: string) {
        status(message)
    }
}
