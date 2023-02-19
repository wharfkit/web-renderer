/// <reference types="svelte" />

declare module '*.svelte' {
    export {SvelteComponentDev as default} from 'svelte/internal'
    export const version: string
    export const dialog
}
