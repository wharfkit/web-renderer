<script lang="ts">
    import close from './icons/CloseIcon.svelte'
    import filecode from './icons/FileCode.svelte'
    import wharf from './icons/Wharf.svelte'

    export let name: keyof typeof icons

    const icons = {
        close,
        filecode,
        wharf,
    }
</script>

<svelte:component this={icons[name]} />
