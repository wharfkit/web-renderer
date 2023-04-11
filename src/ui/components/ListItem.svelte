<script lang="ts">
    import type {ComponentProps} from 'svelte'
    import Icon from './Icon.svelte'

    export let label: string | undefined
    export let onClick
    export let leadingIcon: ComponentProps<Icon>['name'] | undefined = undefined
    export let trailingIcon: ComponentProps<Icon>['name'] | undefined = 'chevron-right'
</script>

<li>
    <button on:click={onClick}>
        {#if leadingIcon}
            <Icon name={leadingIcon} />
        {/if}
        <slot name="logo" />

        <span>{label}</span>

        {#if trailingIcon}
            <Icon name={trailingIcon} />
        {/if}
    </button>
</li>

<style lang="scss">
    li {
        display: flex;
    }

    li:not(:last-child) button {
        border-bottom: 1px solid var(--color-neutral-200);
    }

    li button {
        flex: 1;
        display: grid;
        grid-template-columns: var(--space-xl) 1fr auto;
        align-items: center;
        gap: var(--space-s);
        cursor: pointer;
        border: none;
        background: none;
        color: var(--body-text-color);
        font-size: var(--fs-1);
        font-weight: 500;
    }

    li button:hover {
        color: var(--list-item-text-color-hover);
        background: var(--color-custom-7);
    }

    div {
        padding-block: var(--space-s);
    }

    span {
        text-align: start;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
