<svelte:options tag="wharfkit-modal" />

<script lang="ts" context="module">
    import {active, prompt, message, hideModal} from './Modal'

    export let dialog
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
