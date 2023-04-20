<script lang="ts">
    import {createEventDispatcher, setContext} from 'svelte'
    import {ChainDefinition, Checksum256} from '@wharfkit/session'
    import List from '../components/List.svelte'
    import ListItem from '../components/ListItem.svelte'
    import BodyTitle from '../components/BodyTitle.svelte'
    import {getThemedLogo} from '../../lib/utils'

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
                    leadingIcon="wharf"
                    logo={getThemedLogo(chain)}
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
