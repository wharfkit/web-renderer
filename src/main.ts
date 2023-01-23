import type {UserInterface} from '@wharfkit/session'
import Dimmer from './Dimmer.svelte'
import {showModal, status} from './Modal'
import Modal from './Modal.svelte'

export class WharfKitWeb implements UserInterface {
    static version = '__ver' // replaced by build script

    public modal?: Modal
    public dimmer?: Dimmer

    constructor() {
        // eslint-disable-next-line no-console
        console.log('WharfKitWeb constructor')
        // tslint:disable-next-line:no-this-alias
        window.addEventListener('load', () => {
            // eslint-disable-next-line no-console
            console.log('window load event')
            this.createElements()
        })
    }

    createElements() {
        // eslint-disable-next-line no-console
        console.log('createElements')
        // Set up dimmer
        const el = document.createElement('div')
        el.id = 'wharfkit-dimmer'
        document.body.append(el)
        this.dimmer = new Dimmer({
            target: el,
        })
        // Set up modal
        const el2 = document.createElement('div')
        el2.id = 'wharfkit-modal'
        document.body.append(el2)
        this.modal = new Modal({
            target: el2,
        })
    }

    onTransact(context) {
        // eslint-disable-next-line no-console
        console.log('WharfKitWeb.onTransact', context)
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
