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

        <div>
            <span>{label}</span>
            {#if trailingIcon}
                <Icon name={trailingIcon} />
            {/if}
        </div>
    </button>
</li>

<style lang="scss">
    li {
        display: flex;
    }

    li:not(:last-child) button div {
        border-bottom: 1px solid var(--color-neutral-200);
    }

    li button {
        flex: 1;
        display: flex;
        gap: var(--space-l);
        align-items: center;
        cursor: pointer;
        border: none;
        background: none;
        color: var(--text-color);
        font-size: var(--fs-1);
    }

    div {
        padding-block: var(--space-m);
        // background-color: green;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
        // border-bottom: 1px solid var(--color-neutral-200);
    }
</style>
