<script lang="ts">
    import type {ComponentProps} from 'svelte'
    import Icon from './Icon.svelte'
    export let icon: ComponentProps<Icon>['name'] | undefined = undefined
    export let onClick
    export let variant: 'primary' | 'secondary' | 'outlined' = 'primary'

    $: onKeydown = onClick
</script>

<button class="button {variant}" on:click={onClick} on:keydown={onKeydown}>
    {#if icon}
        <Icon name={icon} />
    {/if}

    <slot />
</button>

<style lang="scss">
    // @import '../../styles/buttonStyles.css';
    @use '../../styles/buttonStyles.css';

    // button {
    //     &:hover {
    //         background: var(--button-primary-hover);
    //         box-shadow: inset 0 0 0 1px var(--button-primary-outline-hover);
    //     }
    //     &:active {
    //         box-shadow: inset 0 0 0 2px var(--button-primary-outline-active);
    //         background: var(--button-primary-active);
    //         // transform: scale(98%);
    //         // transform-origin: center;
    //     }
    // }
</style>
