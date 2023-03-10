<script lang="ts">
    import icons from './icons/index'
    export let name: keyof typeof icons
    // export let size: number = 24
</script>

<svelte:component this={icons[name]} {...$$props} />
