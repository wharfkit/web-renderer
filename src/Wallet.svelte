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
    <h3>Select a wallet</h3>
    {#if wallets}
        {#each wallets as wallet, index}
            <div class="option">
                <button on:click={() => dispatch('complete', index)}>{wallet.name}</button>
                <p>{wallet.description}</p>
            </div>
        {/each}
    {/if}
    <button on:click={() => dispatch('cancel')}>cancel</button>
</div>

<style>
</style>
