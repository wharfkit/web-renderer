<script lang="ts">
    import {slide} from 'svelte/transition'

    export let loading: boolean

    // Default
    const foregroundFill = 'var(--body-background-color)'
    const midgroundFill = 'var(--seafoam-mint)'
    const backgroundFill = 'var(--reef-turquoise)'

    // Midnight
    // const foregroundFill = "#3C4050";
    // const midgroundFill = "#363944";
    // const backgroundFill = "#303440";

    // Inverted
    // const foregroundFill = "#494E62";
    // const midgroundFill = "var(--reef-turquoise)";
    // const backgroundFill = "var(--seafoam-mint)";
</script>

{#if loading}
    <div class="wrapper" transition:slide={{duration: 1000, axis: 'y'}}>
        <svg height="0" width="0">
            <defs>
                <clipPath id="wave-clip">
                    <path
                        d="M 0 300 V 100 Q 100 0 200 100 Q 300 200 400 100 Q 500 0 600 100 Q 700 200 800 100 V 300"
                    />
                </clipPath>
            </defs>
        </svg>

        <svg
            class="wave background"
            height="20px"
            width="200%"
            viewBox="0 0 800 300"
            preserveAspectRatio="none"
        >
            <rect class="clipped" width="100%" height="100%" fill={backgroundFill} />
        </svg>

        <svg
            class="wave midground"
            height="20px"
            width="200%"
            viewBox="0 0 800 300"
            preserveAspectRatio="none"
        >
            <rect class="clipped" width="100%" height="100%" fill={midgroundFill} />
        </svg>

        <svg
            class="wave foreground"
            height="20px"
            width="200%"
            viewBox="0 0 800 300"
            preserveAspectRatio="none"
        >
            <rect class="clipped" width="100%" height="100%" fill={foregroundFill} />
        </svg>
    </div>
{/if}

<style>
    .wrapper {
        transform-origin: top;
        overflow: hidden;
        position: relative;
        /* height: 20px; */
    }

    .clipped {
        clip-path: url(#wave-clip);
    }

    .wave {
        position: absolute;
        left: 0;
        bottom: 0;
    }

    .foreground {
        animation: wave linear infinite 1s;
        bottom: -10px;
    }
    .midground {
        animation: wave linear infinite 2s;
        bottom: -5px;
    }
    .background {
        animation: wave linear infinite 3s;
    }

    @keyframes wave {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-50%);
        }
    }
</style>
