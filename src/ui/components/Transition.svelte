<script lang="ts">
    import {fly} from 'svelte/transition'
    import {TransitionDirection} from '../../types'
    import {settings} from '../state'

    export let direction: TransitionDirection | undefined = undefined

    const {animations} = $settings

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

{#if animations}
    <div class="transition" in:fly={{duration: 200, x, y}}>
        <slot />
    </div>
{:else}
    <slot />
{/if}
