<svelte:options tag="wharfkit-modal" />

<script lang="ts" context="module">
    import {writable} from 'svelte/store'

    export const active = writable(false)
    export const message = writable('...')

    export function status(value) {
        message.set(value)
    }

    let dialog
    export function showModal(): void {
        dialog.showModal()
    }

    export function hideModal(e) {
        dialog.close()
    }
</script>

<dialog bind:this={dialog} open={$active}>
    <div class="modal-content">{$message}</div>
    <button on:click={hideModal}>Close</button>
</dialog>
