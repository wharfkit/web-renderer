import {writable} from 'svelte/store'

import {hideDimmer, showDimmer} from './Dimmer'

export const active = writable(false)
export const message = writable('...')

export function status(value) {
    message.set(value)
}

export function showModal() {
    showDimmer()
    active.set(true)
}

function hide() {
    hideDimmer()

    active.set(false)
}

export function hideModal(e) {
    if (e instanceof KeyboardEvent) {
        e.preventDefault()
        if (e.key === 'Escape' || e.key === 'Enter') {
            hide()
        }
    } else {
        hide()
    }
}
