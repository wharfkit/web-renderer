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
                <button class="cta" on:click={() => dispatch('select', index)}
                    >{wallet.metadata.name}</button
                >
                <p>{wallet.metadata.description}</p>
            </div>
        {/each}
    {/if}
    <button on:click={() => dispatch('cancel')}>cancel</button>
</div>

<style>
    button {
        display: block;
        margin-top: 2rem;
        width: calc(44px * var(--ratio));
        height: 44px;
        border-radius: calc(3px * var(--ratio));
        border: none;
        letter-spacing: ccalc(3 * var(--leading, 0.025em));
        font-family: inherit;
        color: var(--grey-color);
        background-color: var(--light-color-bg);
        font-size: large;
        font-weight: 700;
    }

    button:focus {
        outline: none;
        border: 0.0625rem solid transparent;
        box-shadow: 0 0 0 0.125rem #fff, 0 0 0 0.2rem var(--dark-color-bg);
    }

    button.cta {
        background-color: var(--cta-color);
        color: white;
    }

    button.cta:focus {
        box-shadow: 0 0 0 0.125rem #fff, 0 0 0 0.2rem var(--cta-color);
    }
</style>
