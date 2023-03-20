<script lang="ts">
    import icons from './icons/index'
    import {Space} from '../../styles/types'
    export let name: keyof typeof icons
    export let size: Space = '--space-l'
</script>

<svelte:component this={icons[name]} {...$$props} size={`var(${size})`} />
