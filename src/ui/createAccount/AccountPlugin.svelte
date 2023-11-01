<script lang="ts">
    import {createEventDispatcher, setContext} from 'svelte'
    import {AccountCreationPlugin, Checksum256} from '@wharfkit/session'
    import List from '../components/List.svelte'
    import ListItem from '../components/ListItem.svelte'
    import BodyTitle from '../components/BodyTitle.svelte'
    import {getThemedLogo} from '../../lib/utils'

    export let plugins: AccountCreationPlugin[]
    export let title: string

    const dispatch = createEventDispatcher<{
        select: string
        cancel: void
    }>()
</script>

{#if plugins}
    <section>
        <BodyTitle>{title}</BodyTitle>
        <List>
            {#each plugins as plugin}
                <ListItem
                    label={plugin.name}
                    onClick={() => dispatch('select', plugin.id)}
                    leadingIcon="wharf"
                    logo={getThemedLogo(plugin.metadata)}
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
