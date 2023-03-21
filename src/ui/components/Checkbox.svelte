<script lang="ts">
    import {draw, scale} from 'svelte/transition'
    import {quintOut} from 'svelte/easing'

    export let checked: boolean | null | undefined = null

    const toggleChecked = () => {
        checked = !checked
    }
</script>

<input type="checkbox" {checked} hidden />

<svg
    on:click={toggleChecked}
    on:keydown={toggleChecked}
    class:checked
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
>
    {#if checked}
        <path
            id="box-fill"
            in:scale={{duration: 300, easing: quintOut}}
            out:scale={{duration: 100, easing: quintOut}}
            stroke="none"
            d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"
        />

        <path
            id="check"
            in:draw={{duration: 200, easing: quintOut}}
            out:draw={{duration: 100, easing: quintOut}}
            fill="none"
            d="m9 11 3 3L22 4"
        />
    {/if}

    <path
        id="box-outline"
        fill="none"
        d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"
        stroke-dasharray="70 1000"
        stroke-dashoffset={checked ? 15 : 0}
    />
</svg>

<style>
    svg {
        stroke: var(--checkbox-stroke);
        fill: var(--checkbox-fill);
    }

    svg:active {
        scale: 95%;
    }
    svg:active #box-fill {
        /* fill: var(--seafoam-mint); */
        opacity: 50%;
        /* scale: 75%; */
    }

    #box-fill {
        transform-origin: center;
    }

    #box-outline {
        transition: 100ms cubic-bezier(0.23, 1, 0.32, 1);
    }
</style>
