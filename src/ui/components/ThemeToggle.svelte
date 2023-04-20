<script>
    import {onMount} from 'svelte'
    import {colorScheme} from '../state'
    import {getStoredColorScheme} from '../../lib/utils'

    function toggleColorScheme() {
        colorScheme.update((current) => (current === 'light' ? 'dark' : 'light'))
    }

    onMount(() => {
        // initialize the color scheme based on existing user preference otherwise system default
        if (window.matchMedia) {
            const mql = window.matchMedia('(prefers-color-scheme: dark)')
            colorScheme.set(getStoredColorScheme() ?? (mql.matches ? 'dark' : 'light'))
            mql.addEventListener('change', () => {
                colorScheme.set(mql.matches ? 'dark' : 'light')
            })
        }
    })
</script>

<button on:click={toggleColorScheme}>
    <slot />
</button>

<style lang="scss">
    button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;

        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: center;
    }
</style>
