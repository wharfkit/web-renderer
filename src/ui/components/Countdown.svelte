<script lang="ts">
    import {onDestroy} from 'svelte'
    import {tweened} from 'svelte/motion'
    import {cubicOut} from 'svelte/easing'
    import {isBase64Image, isUrlImage, isValidIcon} from '../../lib/utils'
    import Icon from './Icon.svelte'

    export let data: {
        label?: string
        end?: string
        logo?: string
        loading?: boolean
    } = {}

    let {label, end, logo, loading = true} = data
    let deadline: Date
    let remaining: number
    let timer: NodeJS.Timeout

    $: animated = loading
    let size = 100
    let strokeWidth = 8
    let offset = size / 2
    let radius = offset - strokeWidth
    let circumference = tweened(2 * Math.PI * radius, {
        duration: 500,
        easing: cubicOut,
    })

    $: {
        if (timer) {
            clearInterval(timer)
        }

        if (end) {
            deadline = new Date(end)

            timer = setInterval(() => {
                remaining = new Date(deadline).getTime() - Date.now()
                if (remaining <= 0) {
                    clearInterval(timer)
                    circumference.set(1000)
                    loading = false
                }
            }, 200)
        }
    }

    onDestroy(() => {
        if (timer) {
            clearInterval(timer)
        }
    })

    function countdownFormat(date: Date) {
        const timeLeft = date.getTime() - Date.now()
        if (timeLeft > 0) {
            return new Date(timeLeft).toISOString().slice(14, 19)
        }
        return '00:00'
    }
</script>

<div class="loader">
    <svg class:animated width={size} height={size}>
        <circle
            class="track"
            cx={offset}
            cy={offset}
            r={radius}
            stroke-width={strokeWidth - 1}
            stroke-linecap="round"
            stroke-dasharray={$circumference}
            stroke-dashoffset={0}
            fill="none"
        />
        <!-- {#if animated} -->
        <circle
            class:animated
            class="spinner"
            cx={offset}
            cy={offset}
            r={radius}
            stroke-width={strokeWidth}
            stroke-linecap="round"
            stroke-dasharray={$circumference}
            fill="none"
            style="--radius: {radius}; --circumference: {$circumference};"
        />
        <!-- {/if} -->
    </svg>

    {#if logo}
        <div class="logo">
            {#if isUrlImage(logo) || isBase64Image(logo)}
                <img src={logo} alt={`loading logo`} />
            {:else if isValidIcon(logo)}
                <Icon name={logo} size="75%" />
            {/if}
        </div>
    {/if}

    <div class="text">
        {#if label}
            <p class="label">{label}</p>
        {/if}
        {#if deadline}
            {#key remaining}
                <span class:label={!label}>{countdownFormat(deadline)}</span>
            {/key}
        {/if}
    </div>
</div>

<style lang="scss">
    .loader {
        position: relative;
        height: var(--space-4xl);
        display: grid;
        place-items: center;
        grid-template-areas: 'stack' 'text';
        gap: var(--space-m);
    }

    .logo {
        grid-area: stack;
        place-self: center;
        color: var(--body-text-color);
        width: var(--space-2xl);
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        & > :global(svg) {
            width: 35%;
            height: 35%;
        }
    }

    .text {
        grid-area: text;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: var(--space-4xs);

        .label {
            font-size: var(--fs-2);
            font-weight: 500;
            color: var(--body-text-color);
            margin: 0;
        }

        span {
            font-size: var(--fs-1);
            font-variant-numeric: tabular-nums;
            color: var(--body-text-color-variant);
        }
    }

    svg {
        grid-area: stack;
        animation: 2.5s linear infinite svg-animation;
    }

    @keyframes svg-animation {
        0% {
            transform: rotateZ(0deg);
        }
        100% {
            transform: rotateZ(360deg);
        }
    }

    circle {
        transform-origin: center;

        &.spinner {
            stroke: var(--loading-circle-color);
        }

        &.track {
            stroke: var(--loading-circle-track-color);
        }

        &.animated {
            animation: dash 2.1s ease-in-out both infinite;
        }
    }

    @keyframes dash {
        0% {
            stroke-dashoffset: var(--circumference);
            transform: rotate(0);
        }
        50%,
        65% {
            stroke-dashoffset: 70;
            transform: rotate(90deg);
        }
        100% {
            stroke-dashoffset: var(--circumference);
            transform: rotate(360deg);
        }
    }
</style>
