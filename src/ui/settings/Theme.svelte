<script lang="ts">
    import {getContext} from 'svelte'
    import {theme as stateTheme} from '../state'
    import {getSetting, setSetting} from '../../lib/utils'
    import List from '../components/List.svelte'
    import ListItem from '../components/ListItem.svelte'
    import type {Theme} from '../../types'
    import {i18nType} from 'src/lib/translations'
    import ListOption from '../components/ListOption.svelte'

    const {t} = getContext<i18nType>('i18n')

    let selectedTheme = getSetting('theme', undefined) as Theme | undefined

    function setTheme(theme: Theme | undefined) {
        setSetting('theme', theme)
        selectedTheme = theme
        stateTheme.set(theme)
    }

    type ThemeOption = {
        label: string
        value: Theme | undefined
    }

    const options: ThemeOption[] = [
        {
            label: $t('settings.theme.automatic'),
            value: undefined,
        },
        {
            label: $t('settings.theme.dark'),
            value: 'dark',
        },
        {
            label: $t('settings.theme.light'),
            value: 'light',
        },
    ]
</script>

<List>
    {#each options as option}
        <ListItem>
            <ListOption
                label={option.label}
                name="theme"
                value={option.value}
                checked={selectedTheme === option.value}
                bind:group={selectedTheme}
                onChange={() => setTheme(option.value)}
                hidden
            />
        </ListItem>
    {/each}
</List>
