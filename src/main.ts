import type {UserInterface} from '@wharfkit/session'
import Modal, {showModal, status} from './Modal.svelte'

export class WharfKitWeb implements UserInterface {
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
        console.log('WharfKitWeb.onTransact', context)
        this.createDialog()
        showModal()
    }

    onTransactResult(result) {
        // eslint-disable-next-line no-console
        console.log('WharfKitWeb.onTransactResult', result)
        status('Transaction complete! ' + result.resolved.transaction.id)
    }

    status(message: string) {
        // eslint-disable-next-line no-console
        console.log('WharfKitWeb.status', message)
        status(message)
    }
}
