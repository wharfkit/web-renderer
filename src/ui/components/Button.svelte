<script lang="ts">
    import type {ComponentProps} from 'svelte'
    import Icon from './Icon.svelte'

    type ButtonProps = {
        label: string
        icon?: ComponentProps<Icon>['name'] | undefined
        onClick: () => void
        variant: 'primary' | 'secondary' | 'outlined'
        autofocus?: boolean
    }

    export let data: ButtonProps

    const {label, icon, onClick, variant = 'primary', autofocus} = data
</script>

<button class="button {variant}" on:click={onClick} {autofocus}>
    {#if icon}
        <Icon name={icon} />
    {/if}

    <span>{label}</span>
</button>

<style lang="scss">
    @use '../../styles/buttonStyles.css';
</style>
