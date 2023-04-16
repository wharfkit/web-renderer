<script lang="ts">
    import type {ComponentProps} from 'svelte'
    import Icon from './Icon.svelte'
    export let data: {
        button?: boolean
        href: string
        label: string
        icon?: ComponentProps<Icon>['name']
    }

    let {button = true, href, label, icon} = data
</script>

<a class:button class="outlined" {href} target="_blank" rel="noreferrer">
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
