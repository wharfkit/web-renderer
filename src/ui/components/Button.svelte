<script lang="ts">
    import type {ComponentProps} from 'svelte'
    import Icon from './Icon.svelte'
    export let label: string
    export let icon: ComponentProps<Icon>['name'] | undefined = undefined
    export let onClick
    export let variant: 'primary' | 'secondary' | 'outlined' = 'primary'

    $: onKeydown = onClick
</script>

<button class="button {variant}" on:click={onClick} on:keydown={onKeydown}>
    {#if icon}
        <Icon name={icon} />
    {/if}

    <span>{label}</span>
</button>

<style lang="scss">
    @use '../../styles/buttonStyles.css';
</style>
