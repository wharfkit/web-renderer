<script lang="ts">
    import {onMount} from 'svelte'
    import {theme} from '../state'
    import {capitalize, getStoredTheme} from '../../lib/utils'
    import List from '../components/List.svelte'
    import ListItem from '../components/ListItem.svelte'
    import type {Theme} from '../../types'

    const themes = ['automatic', 'dark', 'light'] as Theme[]

    function toggleTheme() {
        theme.update((current) => (current === 'light' ? 'dark' : 'light'))
    }

    function selectTheme(newTheme: Theme) {
        theme.set(newTheme)
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

<List>
    {#each themes as themeOption}
        <ListItem
            label={capitalize(themeOption)}
            onClick={() => selectTheme(themeOption)}
            trailingIcon={$theme === themeOption ? 'check' : null}
        />
    {/each}
</List>
