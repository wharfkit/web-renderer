<script lang="ts">
    import {fly} from 'svelte/transition'
    export let direction: number = 0
</script>

<div class="transition" in:fly={{duration: 200, x: direction}}>
    <slot />
</div>
