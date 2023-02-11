import {Checksum256} from '@wharfkit/session'
import {LoginContext, LoginOptions, PermissionLevel, UserInterface} from '@wharfkit/session'

import {active, hideModal, loadPrompt, resetPrompt, showModal, status} from './Modal'

import Blockchain from './Blockchain.svelte'
import Button from './Button.svelte'
import CustomPrompt from './CustomPrompt.svelte'
import Modal from './Modal.svelte'
import Qr from './Qr.svelte'
import Countdown from './Countdown.svelte'
import Wallet from './Wallet.svelte'
import {ComponentType, SvelteComponentTyped} from 'svelte'

const elementId = 'wharfkit-dialog'

export default class WebUIRenderer implements UserInterface {
    static version = '__ver' // replaced by build script

    public modal?: Modal
    public displayed = false

    constructor() {
        document.addEventListener('DOMContentLoaded', this.createDialogElement)
        active.subscribe((status) => {
            console.log('active updated', status)
            this.displayed = status
        })
    }

    createDialogElement() {
        const existing = document.getElementById(elementId)
        if (!existing) {
            // Create the dialog element
            const el = document.createElement('div')
            el.id = elementId
            document.body.append(el)
            // Establish the Svelte application in the dialog
            this.modal = new Modal({
                target: el,
            })
        }
    }

    async onError(error: Error) {
        console.log(error)
    }

    async onLogin(options?: LoginOptions) {
        console.log('onLogin')
        if (options) {
            console.log('onLogin options', JSON.parse(JSON.stringify(options)))
        }
    }

    async onLoginResult() {
        console.log('onLoginResult')
        if (this.displayed) {
            hideModal()
        }
        resetPrompt()
    }

    async onSelectChain(context: LoginContext): Promise<Checksum256> {
        console.log('onSelectChain', context.chains)
        showModal()
        const chainSelected = new Promise<Checksum256>((resolve, reject) => {
            loadPrompt({
                component: Blockchain,
                props: {
                    chains: context.chains,
                },
                cancel: async () => reject(),
                complete: async (event: CustomEvent<Checksum256>) => resolve(event.detail),
            })
        })
            .then((chain) => {
                hideModal()
                resetPrompt()
                return chain
            })
            .catch(() => {
                hideModal()
                resetPrompt()
                throw new Error('User cancelled')
            })
        return chainSelected
    }

    async onSelectPermissionLevel(context: LoginContext): Promise<PermissionLevel> {
        console.log('onSelectPermissionLevel', context)
        // this.createDialog()
        // showModal()
        return PermissionLevel.from('renderer@debug')
    }

    async onSelectWallet(context: LoginContext): Promise<number> {
        console.log('context', context)
        console.log('onSelectWallet', context.walletPlugins)
        console.log(this.modal)
        showModal()
        const walletSelected = new Promise<number>((resolve, reject) => {
            loadPrompt({
                component: Wallet,
                props: {
                    wallets: context.walletPlugins,
                },
                cancel: async () => reject(),
                complete: async (event: CustomEvent<number>) => resolve(event.detail),
            })
        })
            .then((chain) => {
                hideModal()
                resetPrompt()
                return chain
            })
            .catch(() => {
                hideModal()
                resetPrompt()
                throw new Error('User cancelled')
            })
        return walletSelected
    }

    async onTransact(context) {
        // eslint-disable-next-line no-console
        console.log('WebUIRenderer.onTransact', context)
        showModal()
    }

    async onTransactResult(result) {
        // eslint-disable-next-line no-console
        console.log('WebUIRenderer.onTransactResult', result)
        status('Transaction complete! ' + result.resolved.transaction.id)
    }

    prompt(args) {
        console.log('prompting... ', args)
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
        console.log(components)
        new Promise<number>((resolve, reject) => {
            loadPrompt({
                component: CustomPrompt,
                props: {
                    title: args.title,
                    body: args.body,
                    components,
                },
                cancel: async () => reject(),
                complete: async (data) => resolve(data),
            })
        })
    }

    status(message: string) {
        // eslint-disable-next-line no-console
        if (!this.displayed) {
            console.log('modal not displayed, showing to update status')
            showModal()
        }
        console.log('WebUIRenderer.status', message)
        status(message)
    }
}
