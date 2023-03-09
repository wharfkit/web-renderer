<script lang="ts">
    import close from './icons/CloseIcon.svelte'
    import filecode from './icons/FileCode.svelte'
    import wharf from './icons/Wharf.svelte'
    import login from './icons/LogIn.svelte'
    import check from './icons/Check.svelte'
    import ChevronRight from './icons/ChevronRight.svelte'
    import ChevronLeft from './icons/ChevronLeft.svelte'

    export let name: keyof typeof icons
    // export let size: string = 'var(--space-l)'

    const icons = {
        close,
        filecode,
        wharf,
        login,
        check,
        'chevron-right': ChevronRight,
        'chevron-left': ChevronLeft,
    }
</script>

<svelte:component this={icons[name]} />
