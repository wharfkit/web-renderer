import {ComponentType, SvelteComponentTyped} from 'svelte/internal'
import {writable} from 'svelte/store'
import {dialog} from './Modal.svelte'

export const active = writable(false)
export const message = writable('...')
export const prompt = writable<Prompt | undefined>()

export function status(value) {
    message.set(value)
}

export interface Prompt {
    component: ComponentType<SvelteComponentTyped>
    props: any
    complete: (e: any) => any
    cancel: (e: any) => any
}

export function showModal(): void {
    active.set(true)
    dialog.showModal()
}

export function hideModal() {
    active.set(false)
    dialog.close()
}

export function loadPrompt(promptOptions: Prompt) {
    prompt.set(promptOptions)
}

export function resetPrompt() {
    prompt.set(undefined)
}
