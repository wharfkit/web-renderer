<script lang="ts">
    import {fly} from 'svelte/transition'
    import {TransitionDirection} from '../../types'

    export let direction: TransitionDirection | undefined = undefined

    const horizontal = ['ltr', 'rtl']
    // const vertical = ['ttb', 'btt']

    const getDistance = (direction: TransitionDirection) => {
        return direction === 'rtl' || direction === 'btt' ? 100 : -100
    }

    $: [x, y] = direction
        ? horizontal.includes(direction)
            ? [getDistance(direction), 0]
            : [0, getDistance(direction)]
        : [0, 0]
</script>

<div class="transition" in:fly={{duration: 200, x: x, y: y}}>
    <slot />
</div>
