<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import {UserInterfaceWalletPlugin} from '@wharfkit/session'
    import List from '../components/List.svelte'
    import ListItem from '../components/ListItem.svelte'
    import BodyTitle from '../components/BodyTitle.svelte'
    import {getThemedLogo} from '../../lib/utils'
    export let wallets: UserInterfaceWalletPlugin[]
    export let title: string

    const dispatch = createEventDispatcher<{
        select: number
        cancel: void
    }>()
</script>

{#if wallets}
    <section>
        <BodyTitle>{title}</BodyTitle>
        <List>
            {#each wallets as wallet, index}
                <ListItem
                    label={wallet.metadata.name}
                    onClick={() => dispatch('select', index)}
                    leadingIcon="wallet"
                    logo={getThemedLogo(wallet.metadata)}
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

    ul {
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: var(--space-m);
    }

    li {
        flex: 1;
        display: flex;
    }

    .logo {
        display: grid;
        place-content: center;
    }
</style>
