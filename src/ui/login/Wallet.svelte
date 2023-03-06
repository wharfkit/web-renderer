<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import {UserInterfaceWalletPlugin} from '@wharfkit/session'

    import Button from '../components/Button.svelte'

    export let wallets: UserInterfaceWalletPlugin[]

    const dispatch = createEventDispatcher<{
        select: number
        cancel: void
    }>()
</script>

<div>
    {#if wallets}
        <ul>
            {#each wallets as wallet, index}
                <li>
                    <Button
                        label={wallet.metadata.name}
                        onClick={() => dispatch('select', index)}
                    />
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style lang="scss">
    @use '../../styles/buttonStyles.css';

    ul {
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: var(--s0);
    }

    li {
        flex: 1;
        display: flex;
    }
</style>
