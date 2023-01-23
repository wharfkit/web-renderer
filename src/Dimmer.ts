import {writable} from 'svelte/store'

export const dimmer = writable(false)

export function showDimmer() {
    dimmer.set(true)
}

export function hideDimmer() {
    dimmer.set(false)
}
