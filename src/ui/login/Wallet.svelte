<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import {UserInterfaceWalletPlugin} from '@wharfkit/session'
    import Icon from '../components/Icon.svelte'
    import List from '../components/List.svelte'
    import ListItem from '../components/ListItem.svelte'
    import {isBase64Image, isUrlImage} from '../../lib/utils'
    import BodyTitle from '../components/BodyTitle.svelte'
    import type {ColorScheme} from '../../types'
    export let wallets: UserInterfaceWalletPlugin[]
    export let title: string

    const dispatch = createEventDispatcher<{
        select: number
        cancel: void
    }>()

    const getLogo = (
        wallet: UserInterfaceWalletPlugin,
        colorScheme: ColorScheme
    ): string | undefined => {
        const {logo, name} = wallet.metadata ?? {}
        if (!logo) {
            console.warn(`${name} does not have a logo.`)
            return
        }
        const oppositeColorScheme = colorScheme === 'light' ? 'dark' : 'light'
        const themedLogo: string = logo[colorScheme] ?? logo[oppositeColorScheme]
        if (isBase64Image(themedLogo) || isUrlImage(themedLogo)) {
            return themedLogo
        }
        console.warn(`${name} ${colorScheme} logo is not a supported image format.`)
    }

    let colorScheme: ColorScheme = 'light'
    if (window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            colorScheme = 'dark'
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
            colorScheme = event.matches ? 'dark' : 'light'
        })
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
                    logo={getLogo(wallet, colorScheme)}
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
