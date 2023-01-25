import type {UserInterface} from '@wharfkit/session'
import Modal, {showModal, status} from './Modal.svelte'

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
