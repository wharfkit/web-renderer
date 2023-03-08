<script lang="ts">
    import type {ComponentProps} from 'svelte'
    import Icon from './Icon.svelte'

    export let leadingIcon: ComponentProps<Icon>['name'] = ''
    export let trailingIcon: ComponentProps<Icon>['name'] = 'chevron-right'
    export let label: string | undefined
    export let onClick
</script>

<li>
    <button on:click={onClick}>
        <Icon name={leadingIcon} />

        <div>
            <span>{label}</span>
            <Icon name={trailingIcon} />
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
        gap: var(--s1);
        align-items: center;
        cursor: pointer;
        border: none;
        background: none;
        color: var(--text-color);
        font-size: var(--fs-1);
    }

    div {
        padding-block: var(--s0);
        // background-color: green;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
        // border-bottom: 1px solid var(--color-neutral-200);
    }
</style>
