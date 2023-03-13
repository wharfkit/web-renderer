<script lang="ts">
    import {createEventDispatcher, setContext} from 'svelte'
    import {ChainDefinition, Checksum256} from '@wharfkit/session'
    import Icon from '../components/Icon.svelte'
    import Button from '../components/Button.svelte'
    import List from '../components/List.svelte'
    import ListItem from '../components/ListItem.svelte'

    export let chains: ChainDefinition[]

    const dispatch = createEventDispatcher<{
        select: Checksum256
        cancel: void
    }>()
</script>

<div>
    {#if chains}
        <List>
            {#each chains as chain}
                <ListItem
                    label={chain.name}
                    onClick={() => dispatch('select', chain.id)}
                    leadingIcon="wharf"
                />
            {/each}
        </List>
    {/if}

    <Button data={{variant: 'secondary', onClick: () => dispatch('cancel'), label: 'Cancel'}} />
</div>

<style lang="scss">
    div {
        display: flex;
        flex-direction: column;
        gap: var(--space-l);
    }
</style>
