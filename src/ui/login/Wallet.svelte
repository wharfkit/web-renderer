<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import {UserInterfaceWalletPlugin} from '@wharfkit/session'
    import {fly} from 'svelte/transition'

    import Button from '../components/Button.svelte'
    import List from '../components/List.svelte'
    import ListItem from '../components/ListItem.svelte'

    export let wallets: UserInterfaceWalletPlugin[]
    export let direction: number

    const dispatch = createEventDispatcher<{
        select: number
        cancel: void
    }>()
</script>

<div in:fly={{duration: 200, x: direction}}>
    {#if wallets}
        <List>
            {#each wallets as wallet, index}
                <ListItem label={wallet.metadata.name} onClick={() => dispatch('select', index)}>
                    <!-- <Button
                        data={{
                            label: wallet.metadata.name,
                            onClick: () => dispatch('select', index),
                        }}
                    /> -->
                </ListItem>
            {/each}
        </List>
    {/if}
</div>

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
</style>
