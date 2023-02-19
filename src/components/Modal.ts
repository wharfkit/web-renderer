import {writable} from 'svelte/store'

export const message = writable('...')

export function status(value) {
    message.set(value)
}
