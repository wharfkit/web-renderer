<script>
    import {onMount} from 'svelte'
    import {theme} from '../state'
    import {getStoredTheme} from '../../lib/utils'

    function toggleTheme() {
        theme.update((current) => (current === 'light' ? 'dark' : 'light'))
    }

    onMount(() => {
        // initialize the color scheme based on existing user preference otherwise system default
        if (window.matchMedia) {
            const mql = window.matchMedia('(prefers-color-scheme: dark)')
            theme.set(getStoredTheme() ?? (mql.matches ? 'dark' : 'light'))
            mql.addEventListener('change', () => {
                theme.set(mql.matches ? 'dark' : 'light')
            })
        }
    })
</script>

<button on:click={toggleTheme}>
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
        align-items: center;
    }
</style>
