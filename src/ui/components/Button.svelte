<script lang="ts">
    import type {ComponentProps} from 'svelte'
    import Icon from './Icon.svelte'

    type ButtonProps = {
        label: string
        icon?: ComponentProps<Icon>['name'] | undefined
        onClick
        variant: 'primary' | 'secondary' | 'outlined'
    }

    export let data: ButtonProps

    const {label, icon, onClick, variant = 'primary'} = data

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
