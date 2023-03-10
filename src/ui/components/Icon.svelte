<script lang="ts">
    import * as icons from 'lucide-svelte'
    export let name: keyof typeof icons
    export let size: number = 24
</script>

<svelte:component this={icons[name]} {...$$props} />
