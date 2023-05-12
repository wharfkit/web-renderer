<script lang="ts">
    import icons from './icons'
    import type {Icon} from './icons'
    import type {PercentageString, Space} from '../../types'
    export let name: Icon
    export let size: Space | PercentageString = 'var(--space-l)'
    export let color: string = 'currentColor'
</script>

<div style="width: {size}; display: grid; place-content: center; color: {color}">
    <svelte:component this={icons[name]} {...$$props} />
</div>

<style lang="scss">
    div :global(svg) {
        width: 100%;
        height: 100%;
    }
</style>
