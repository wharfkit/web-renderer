<svelte:options tag="wharfkit-modal-wallet" />

<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import {WalletPluginMetadata} from '@wharfkit/session'

    export let wallets: WalletPluginMetadata[]

    const dispatch = createEventDispatcher<{
        complete: number
        cancel: void
    }>()
</script>

<div>
    <h3>Pick yo wallllllet!</h3>
    {#if wallets}
        {#each wallets as wallet, index}
            <button on:click={() => dispatch('complete', index)}
                >{wallet.name} ({wallet.description})</button
            >
        {/each}
    {/if}
    <button on:click={() => dispatch('cancel')}>cancel</button>
</div>

<style>
    div {
        padding: 10px;
    }
</style>
