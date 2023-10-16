<script lang="ts">
    import BodyTitle from './BodyTitle.svelte'
    import BodyText from './BodyText.svelte'
    import Icon from './Icon.svelte'
    import type {Icon as IconType} from './icons.ts'
    export let title: string | undefined = undefined
    export let details: string | undefined = undefined
    export let icon: IconType | undefined = undefined
    export let iconColor: string = 'currentColor'
</script>

<div>
    {#if icon}
        <Icon name={icon} size="var(--space-3xl)" color={iconColor} />
    {/if}
    {#if title}
        <BodyTitle>{title}</BodyTitle>
    {/if}
    {#if details}
        <BodyText>{details}</BodyText>
    {/if}
</div>

<style lang="scss">
    div {
        display: grid;
        justify-items: center;
        gap: var(--space-s);
        text-align: center;
        color: var(--body-text-color);
        margin-block: var(--space-s);
    }
</style>
