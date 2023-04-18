<script lang="ts">
    import {createEventDispatcher, setContext} from 'svelte'
    import {ChainDefinition, Checksum256} from '@wharfkit/session'
    import Icon from '../components/Icon.svelte'
    import Button from '../components/Button.svelte'
    import List from '../components/List.svelte'
    import ListItem from '../components/ListItem.svelte'
    import BodyTitle from '../components/BodyTitle.svelte'

    export let chains: ChainDefinition[]
    export let title: string

    const dispatch = createEventDispatcher<{
        select: Checksum256
        cancel: void
    }>()
</script>

{#if chains}
    <section>
        <BodyTitle>{title}</BodyTitle>
        <List>
            {#each chains as chain}
                <ListItem
                    label={chain.name}
                    onClick={() => dispatch('select', chain.id)}
                    logo={chain.getLogo()}
                    leadingIcon="wharf"
                />
            {/each}
        </List>
    </section>
{/if}

<style lang="scss">
    section {
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
    }
</style>
