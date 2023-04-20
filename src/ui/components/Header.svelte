<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import HeaderButton from './HeaderButton.svelte'
    import {backAction} from '../state'
    import {fade} from 'svelte/transition'
    import ThemeToggle from './ThemeToggle.svelte'

    export let title: string
    export let subtitle: string | undefined

    const dispatch = createEventDispatcher<{
        cancel: void
    }>()
</script>

<div class="modal-header">
    <div class="slot left">
        <slot name="left">
            {#if $backAction}
                <div transition:fade={{duration: 100}}>
                    <HeaderButton icon="chevron-left" onClick={$backAction} />
                </div>
            {/if}
        </slot>
    </div>
    <div class="slot center">
        <slot name="center">
            <ThemeToggle>
                <h2>{title}</h2>
                {#if subtitle}
                    <p>{subtitle}</p>
                {/if}
            </ThemeToggle>
        </slot>
    </div>
    <div class="slot right">
        <slot name="right">
            <HeaderButton icon="close" onClick={() => dispatch('cancel')} />
        </slot>
    </div>
</div>

<style lang="scss">
    .modal-header {
        box-sizing: border-box;
        min-height: var(--header-height);
        color: var(--header-text-color);
        background: var(--header-background-color);
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        // grid-template-columns: 1fr 2fr 1fr;
        gap: var(--space-s);
        padding: var(--space-m);

        .slot {
            display: flex;
            align-items: center;
        }

        .center {
            flex-direction: column;
            justify-content: space-around;
            text-align: center;
        }

        .right {
            justify-content: flex-end;
        }

        :is(h2, p) {
            color: var(--header-text-color);
            margin: 0;
            line-height: 1.1em;
        }

        h2 {
            font-size: var(--fs-3);
            font-weight: 700;
        }
        p {
            font-size: var(--fs-0);
        }
    }
</style>
