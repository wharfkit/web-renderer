<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import {ChainDefinition, Checksum256} from '@wharfkit/session'

    export let chains: ChainDefinition[]

    const dispatch = createEventDispatcher<{
        select: Checksum256
        cancel: void
    }>()
</script>

<div>
    {#if chains}
        <ul>
            {#each chains as chain}
                <li>
                    <button on:click={() => dispatch('select', chain.id)}>{chain.name}</button>
                </li>
            {/each}
        </ul>
    {/if}

    <button on:click={() => dispatch('cancel')}>cancel</button>
</div>
