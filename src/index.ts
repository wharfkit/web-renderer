import {Checksum256} from '@wharfkit/session'
import {
    ChainDefinition,
    LoginContext,
    LoginOptions,
    PermissionLevel,
    UserInterface,
    WalletPlugin,
} from '@wharfkit/session'
import Blockchain from './Blockchain.svelte'
import Modal, {hideModal, loadPrompt, resetPrompt, showModal, status} from './Modal.svelte'
import Wallet from './Wallet.svelte'

export default class WebUIRenderer implements UserInterface {
    static version = '__ver' // replaced by build script

    public modal?: Modal

    createDialog() {
        const existing = document.getElementById('wharfkit-modal')
        if (!existing) {
            const el = document.createElement('div')
            el.id = 'wharfkit-modal'
            document.body.append(el)
            this.modal = new Modal({
                target: el,
            })
        }
    }

    onLogin(options?: LoginOptions) {
        console.log('onLogin')
        if (options) {
            console.log('onLogin options', JSON.parse(JSON.stringify(options)))
        }
    }

    onLoginResult() {
        console.log('onLoginResult')
    }

    async onSelectChain(context: LoginContext): Promise<Checksum256> {
        console.log('onSelectChain', context.chains)
        this.createDialog()
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
        console.log('onSelectWallet', context.walletPlugins)
        this.createDialog()
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

    onTransact(context) {
        // eslint-disable-next-line no-console
        console.log('WebUIRenderer.onTransact', context)
        this.createDialog()
        showModal()
    }

    onTransactResult(result) {
        // eslint-disable-next-line no-console
        console.log('WebUIRenderer.onTransactResult', result)
        status('Transaction complete! ' + result.resolved.transaction.id)
    }

    status(message: string) {
        // eslint-disable-next-line no-console
        console.log('WebUIRenderer.status', message)
        status(message)
    }
}
