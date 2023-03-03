<script lang="ts">
    import type {ComponentProps} from 'svelte'
    import Icon from './Icon.svelte'
    export let onClick
    export let icon: ComponentProps<Icon>['name']
    const onKeydown = onClick
</script>

<button on:click={onClick} on:keydown={onKeydown}>
    <Icon name={icon} />
</button>

<style lang="scss">
    button {
        background: none;
        border: 1px solid var(--header-button-outline);
        border-radius: var(--space-2xs);
        cursor: pointer;
        width: 46px;
        height: 46px;
        display: grid;
        place-content: center;
        color: var(--header-text-color);

        &:hover {
            background: var(--header-button-outline);
        }

        &:active {
            transform: scale(95%);
            transform-origin: center;
        }
    }
</style>
