<script lang="ts">
    export let checked: boolean | null | undefined = null

    const toggleChecked = () => {
        checked = !checked
        animate()
    }

    let boxFill

    const animate = () => {
        boxFill.beginElement()
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
    <path
        id="box-fill"
        stroke="none"
        d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"
    >
        <animateTransform
            bind:this={boxFill}
            attributeName="transform"
            attributeType="XML"
            type="scale"
            begin="indefinite"
            fill="freeze"
            from={!checked ? 1 : 0}
            to={!checked ? 0 : 1}
            dur="200ms"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.230 1.000 0.320 1.000"
        />
    </path>
    <path id="check" fill="none" d="m9 11 3 3L22 4">
        <animate
            attributeName="stroke-dashoffset"
            from="290"
            to="0"
            begin="indefinite"
            dur="6s"
            fill="freeze"
        />
    </path>

    <path
        id="box-outline"
        fill="none"
        d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
    />
</svg>

{checked}

<style>
    svg {
        stroke: var(--wharf-blue);
        fill: var(--reef-turquoise);
    }
    #box-fill {
        transform-origin: center;
    }
</style>
