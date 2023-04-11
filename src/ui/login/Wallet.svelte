<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import {UserInterfaceWalletPlugin} from '@wharfkit/session'
    import Icon from '../components/Icon.svelte'
    import List from '../components/List.svelte'
    import ListItem from '../components/ListItem.svelte'
    import {isBase64Image} from '../../lib/utils'

    export let wallets: UserInterfaceWalletPlugin[]

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
    <List>
        {#each wallets as wallet, index}
            <ListItem label={wallet.metadata.name} onClick={() => dispatch('select', index)}>
                <div class="logo" slot="logo">
                    {#if hasValidLogo(wallet)}
                        <img
                            src={wallet.metadata.logo}
                            alt={wallet.metadata.name}
                            width="30"
                            height="30"
                        />
                    {:else}
                        <Icon name="wallet" />
                    {/if}
                </div>
            </ListItem>
        {/each}
    </List>
{/if}

<style lang="scss">
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
