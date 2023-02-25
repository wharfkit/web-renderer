<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import {UserInterfaceWalletPlugin} from '@wharfkit/session'

    export let wallets: UserInterfaceWalletPlugin[]

    const dispatch = createEventDispatcher<{
        select: number
        cancel: void
    }>()
</script>

<div>
    {#if wallets}
        {#each wallets as wallet, index}
            <div class="option">
                <button on:click={() => dispatch('select', index)}>{wallet.metadata.name}</button>
                <p>{wallet.metadata.description}</p>
            </div>
        {/each}
    {/if}
    <button class="secondary" on:click={() => dispatch('cancel')}>cancel</button>
</div>

<style lang="scss">
    button {
        display: block;
        width: 300px;
        height: 65px;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        color: var(--button-text-color);
        background-color: var(--button-primary-color);
        border: none;
        box-shadow: none;
        margin: 0 auto;
        &.secondary {
            background-color: var(--button-secondary-color);
        }
    }
</style>
