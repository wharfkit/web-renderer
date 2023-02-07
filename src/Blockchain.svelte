<svelte:options tag="wharfkit-modal-blockchain" />

<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import {Checksum256} from '@wharfkit/session'

    export let chains: Checksum256[]

    const dispatch = createEventDispatcher<{
        complete: Checksum256
        cancel: void
    }>()
</script>

<div>
    <h3>Pick yo blockchain!</h3>
    {#if chains}
        {#each chains as chain}
            <button on:click={() => dispatch('complete', chain.id)}>{chain.name}</button>
        {/each}
    {/if}
    <button on:click={() => dispatch('cancel')}>cancel</button>
</div>

<style>
</style>
