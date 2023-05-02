<script lang="ts">
    import {fly} from 'svelte/transition'
    import {TransitionDirection} from '../../types'
    export let direction: TransitionDirection | undefined = undefined

    const distance = {
        ltr: -100,
        rtl: 100,
    }

    $: x = direction ? distance[direction] : 0
</script>

<div class="transition" in:fly={{duration: 200, x: x}}>
    <slot />
</div>
