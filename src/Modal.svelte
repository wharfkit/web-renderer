<svelte:options tag="wharfkit-modal" />

<script lang="ts" context="module">
    import {writable} from 'svelte/store'

    export const active = writable(false)
    export const message = writable('...')

    export function status(value) {
        message.set(value)
    }

    let dialog

    interface Prompt {
        component: ConstructorOfATypedSvelteComponent
        props: any
        complete: (e: any) => any
        cancel: (e: any) => any
    }
    const prompt = writable<Prompt | undefined>()

    export function showModal(): void {
        dialog.showModal()
    }

    export function hideModal() {
        dialog.close()
    }

    export function loadPrompt(promptOptions: Prompt) {
        prompt.set(promptOptions)
    }

    export function resetPrompt() {
        prompt.set(undefined)
    }
</script>

<dialog bind:this={dialog} open={$active}>
    {#if $prompt}
        <svelte:component
            this={$prompt.component}
            on:complete={$prompt.complete}
            on:cancel={$prompt.cancel}
            {...$prompt.props}
        />
    {:else}
        <div class="modal-content">{$message}</div>
        <button on:click={hideModal}>Close</button>
    {/if}
</dialog>
