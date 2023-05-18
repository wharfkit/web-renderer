<script lang="ts">
    // export let animate: boolean = true

    let motion = 'linear'
    let frequency = 7000

    let fgFrequency = 10000
    let mgFrequency = 9500
    let bgFrequency = 8600

    let containerHeight = 25

    let fgHeight = 50
    let mgHeight = 75
    let bgHeight = 100

    let fgSwell = 1.2
    let mgSwell = 1.4
    let bgSwell = 1.3

    let fgSwellSpeed = 3100
    let mgSwellSpeed = 2300
    let bgSwellSpeed = 1000

    let fgSwellDelay = 9000
    let mgSwellDelay = 7900
    let bgSwellDelay = 9100

    const foregroundFill = 'var(--wave-foreground-color)'
    const midgroundFill = 'var(--wave-midground-color)'
    const backgroundFill = 'var(--wave-background-color)'
</script>

<div
    class="wrapper"
    style="
    --frequency: {frequency}ms;
    --foreground-speed: {fgFrequency}ms;
    --midground-speed: {mgFrequency}ms; 
    --background-speed: {bgFrequency}ms; 
    --container-height: {containerHeight}px;
    --motion: {motion};
    --foreground-swell: {fgSwell};
    --midground-swell: {mgSwell};
    --background-swell: {bgSwell};
    --foreground-swell-speed: {fgSwellSpeed}ms;
    --midground-swell-speed: {mgSwellSpeed}ms;
    --background-swell-speed: {bgSwellSpeed}ms;
    --foreground-delay: {fgSwellDelay}ms;
    --midground-delay: {mgSwellDelay}ms;
    --background-delay: {bgSwellDelay}ms;
    "
>
    <svg height="0" width="0">
        <defs>
            <clipPath id="wave-clip">
                <path
                    d="M 0 300 V 100 Q 100 0 200 100 Q 300 200 400 100 Q 500 0 600 100 Q 700 200 800 100 V 300"
                />
            </clipPath>
        </defs>
    </svg>

    <div class="container background">
        <svg
            class="wave background"
            width="100%"
            height="{bgHeight}%"
            viewBox="0 0 800 300"
            preserveAspectRatio="none"
        >
            <rect class="clipped" height="100%" width="100%" fill={backgroundFill} />
        </svg>
    </div>

    <div class="container midground">
        <svg
            class="wave midground"
            width="100%"
            height="{mgHeight}%"
            viewBox="0 0 800 300"
            preserveAspectRatio="none"
        >
            <rect class="clipped" width="100%" height="100%" fill={midgroundFill} />
        </svg>
    </div>

    <div class="container foreground">
        <svg
            class="wave foreground"
            width="100%"
            height="{fgHeight}%"
            viewBox="0 0 800 300"
            preserveAspectRatio="none"
        >
            <rect class="clipped" width="100%" height="100%" fill={foregroundFill} />
        </svg>
    </div>
</div>

<style>
    .wrapper {
        transform-origin: top;
        overflow: hidden;
        position: relative;
        height: var(--container-height);
        background-color: var(--header-background-color);
        /* background: transparent; */
    }

    .clipped {
        clip-path: url(#wave-clip);
    }

    .container {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 200%;
        height: 100%;
        transform-origin: bottom;
    }

    .container.foreground {
        /* animation: wave-slide var(--motion) infinite var(--foreground-speed); */
        /* transform: scaleY(var(--foreground-scale)); */
    }

    .container.midground {
        /* animation: wave-slide var(--motion) infinite var(--midground-speed); */
        /* transform: scaleY(var(--midground-scale)); */
    }

    .container.background {
        /* animation: wave-slide var(--motion) infinite var(--background-speed); */
        /* transform: scaleY(var(--background-scale)); */
    }

    @keyframes wave-slide {
        from {
            transform: translate(0);
        }
        to {
            transform: translate(-50%);
        }
    }

    .wave {
        position: absolute;
        /* left: 0; */
        bottom: -2px;
        opacity: 0.9999;
        /* transition: all 200ms ease; */
        transform-origin: bottom;
        /* animation: wave-swell ease-in-out infinite alternate var(--swell-speed) var(--swell-delay); */
    }

    .wave.foreground {
        --swell: var(--foreground-swell);
        --swell-speed: var(--foreground-swell-speed);
        --swell-delay: var(--foreground-delay);
    }
    .wave.midground {
        --swell: var(--midground-swell);
        --swell-speed: var(--midground-swell-speed);
        --swell-delay: var(--midground-delay);
    }
    .wave.background {
        --swell: var(--background-swell);
        --swell-speed: var(--background-swell-speed);
        --swell-delay: var(--background-delay);
    }

    @keyframes wave-swell {
        from {
            transform: scaleY(1);
        }
        to {
            transform: scaleY(var(--swell));
        }
    }
</style>
