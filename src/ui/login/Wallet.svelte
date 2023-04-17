<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import {UserInterfaceWalletPlugin} from '@wharfkit/session'
    import Icon from '../components/Icon.svelte'
    import List from '../components/List.svelte'
    import ListItem from '../components/ListItem.svelte'
    import {isBase64Image} from '../../lib/utils'
    import BodyTitle from '../components/BodyTitle.svelte'
    export let wallets: UserInterfaceWalletPlugin[]
    export let title: string

    const dispatch = createEventDispatcher<{
        select: number
        cancel: void
    }>()

    const hasValidLogo = ({metadata: {logo, name}}: UserInterfaceWalletPlugin) => {
        if (isBase64Image(logo)) {
            return true
        } else {
            console.warn(`${name} logo is not a valid base64 image`)
            return false
        }
    }
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
                    logo={hasValidLogo(wallet) ? wallet.metadata.logo : undefined}
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
