<script lang="ts">
    import icons from './icons/index'

    export let name: keyof typeof icons
    //
</script>

<svelte:component this={icons[name]} />
