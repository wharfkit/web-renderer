<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import HeaderButton from './HeaderButton.svelte'

    export let title: string
    export let subtitle: string

    const dispatch = createEventDispatcher<{
        cancel: void
    }>()
</script>

<div class="modal-header">
    <slot name="left">
        <div class="left" />
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
        min-height: var(--space-2xl);
        max-height: var(--space-4xl);
        color: var(--header-text-color);
        background: var(--background-color);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        padding: var(--space-s);

        .center {
            display: grid;
            place-content: center;
            text-align: center;
            gap: var(--space-2xs);
        }

        .right {
            display: flex;
            justify-content: flex-end;
        }

        h2 {
            font-size: var(--fs-2);
            font-weight: 700;
            line-height: 1em;
        }
        p {
            font-size: var(--fs-0);
            line-height: 1em;
        }
    }
</style>
