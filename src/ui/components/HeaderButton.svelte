<script lang="ts">
    import type {ComponentProps} from 'svelte'
    import Icon from './Icon.svelte'
    export let onClick
    export let icon: ComponentProps<Icon>['name']
</script>

<button on:click={onClick}>
    <span class="background" />
    <Icon name={icon} />
    <span class="label visually-hidden">{icon}</span>
</button>

<style lang="scss">
    button {
        --button-size: 46px;
        --button-size: var(--space-2xl);
        position: relative;
        isolation: isolate;
        background: var(--header-button-background);
        border: 1px solid var(--header-button-outline);
        border: none;
        box-shadow: inset 0 0 0 1px var(--header-button-outline);
        border-radius: var(--border-radius-inner);
        cursor: pointer;
        width: var(--button-size);
        height: var(--button-size);
        display: grid;
        place-content: center;
        color: var(--header-text-color);
        transition: transform 80ms ease;

        &:active {
            transform: scale(95%);
            transform-origin: center;
        }
    }

    @media (hover: hover) {
        button:hover .background {
            opacity: 1;
        }
    }

    .background {
        position: absolute;
        border-radius: var(--border-radius-inner);
        inset: 0;
        opacity: 0;
        z-index: -1;
        transition: opacity 80ms ease;
        background: var(--header-button-outline);
    }

    .visually-hidden {
        border: 0;
        clip: rect(0 0 0 0);
        height: auto;
        margin: 0;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
        white-space: nowrap;
    }
</style>
