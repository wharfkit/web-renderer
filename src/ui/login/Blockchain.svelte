<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import {ChainDefinition, Checksum256} from '@wharfkit/session'
    import Icon from '../components/Icon.svelte'
    import Button from '../components/Button.svelte'

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
                    <Icon name="wharf" />
                    <button on:click={() => dispatch('select', chain.id)}>
                        <span>{chain.name}</span>
                        <Icon name="chevron-right" />
                    </button>
                </li>
            {/each}
        </ul>
    {/if}

    <Button variant="secondary" onClick={() => dispatch('cancel')} label="Cancel" />
</div>

<style lang="scss">
    div {
        display: flex;
        flex-direction: column;
        gap: var(--s1);
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        display: flex;
        align-items: center;
        gap: var(--s1);
    }

    li:not(:last-child) button {
        border-bottom: 1px solid var(--color-neutral-200);
    }

    li button {
        flex: 1;
        border: none;
        background: none;
        color: var(--text-color);
        font-size: var(--fs-0);
        // font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        padding-block: var(--s0);
    }
</style>
