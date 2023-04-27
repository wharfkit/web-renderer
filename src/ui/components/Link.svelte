<script lang="ts">
    import type {ComponentProps} from 'svelte'
    import Icon from './Icon.svelte'
    export let data: {
        button?: boolean
        href: string
        label: string
        icon?: ComponentProps<Icon>['name']
        variant?: 'primary' | 'secondary' | 'outlined'
    }

    let {button = true, href, label, icon, variant = 'outlined'} = data
</script>

<a class:button class={variant} {href} target="_blank" rel="noreferrer">
    {#if icon}
        <Icon name={icon} />
    {/if}
    <span>{label}</span>
</a>

<style lang="scss">
    @use '../../styles/buttonStyles.css';

    a {
        align-self: stretch;
    }
</style>
