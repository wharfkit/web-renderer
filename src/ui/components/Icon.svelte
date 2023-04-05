<script lang="ts">
    import icons from './icons/index'
    import type {Space} from '../../types'
    export let name: keyof typeof icons
    export let size: Space = '--space-l'
</script>

<div style="width: var({size}); display: grid; place-content: center;">
    <svelte:component this={icons[name]} {...$$props} />
</div>
