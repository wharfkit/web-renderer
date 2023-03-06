<script lang="ts">
    import close from './icons/CloseIcon.svelte'
    import filecode from './icons/FileCode.svelte'
    import wharf from './icons/Wharf.svelte'
    import login from './icons/LogIn.svelte'
    import check from './icons/Check.svelte'
    import chevronright from './icons/ChevronRight.svelte'

    export let name: keyof typeof icons

    const icons = {
        close,
        filecode,
        wharf,
        login,
        check,
        'chevron-right': chevronright,
    }
</script>

<svelte:component this={icons[name]} />
