<script lang="ts">
    import {createEventDispatcher, setContext} from 'svelte'
    import HeaderButton from './HeaderButton.svelte'

    export let title: string
    export let subtitle: string

    const dispatch = createEventDispatcher<{
        cancel: void
    }>()
</script>

<div class="modal-header">
    <slot name="left">
        <div class="left">
            <HeaderButton icon="chevron-left" onClick={() => dispatch('cancel')} />
        </div>
    </slot>
    <slot name="center">
        <div class="center">
            <h2>{title}</h2>
            {#if subtitle}
                <p>{subtitle}</p>
            {/if}
        </div>
    </slot>
    <slot name="right">
        <div class="right">
            <HeaderButton icon="close" onClick={() => dispatch('cancel')} />
        </div>
    </slot>
</div>

<style lang="scss">
    .modal-header {
        box-sizing: border-box;
        min-height: var(--header-height);
        color: var(--header-text-color);
        background: var(--background-color);
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        // grid-template-columns: 1fr 2fr 1fr;
        gap: var(--space-s);
        padding: var(--space-m);

        .center {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            text-align: center;
            // gap: var(--space-2xs);
            // overflow: hidden;
        }

        .right {
            display: flex;
            justify-content: flex-end;
        }

        :is(h2, p) {
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
