<script lang="ts">
    import List from '../components/List.svelte'
    import ListItem from '../components/ListItem.svelte'
    import languages from '../../lib/translations/lang.json'
    import type {i18nType} from 'src/lib/translations'
    import {props} from '../state'
    import {getContext} from 'svelte'
    import Icon from '../components/Icon.svelte'
    import ListOption from '../components/ListOption.svelte'

    const {t, l, setLocale} = getContext<i18nType>('i18n')

    const locales = Object.keys(languages)

    const changeLocale = (locale: string) => {
        setLocale(locale).then(() => {
            // Update the header title and subtitle immediately on selection
            $props.language = locale
            $props.title = $t('settings.title')
            $props.subtitle = $t('settings.language.title')
        })
    }
</script>

<List>
    {#each locales as loc}
        <ListItem>
            <ListOption
                label={languages[loc]}
                name="language"
                value={loc}
                checked={$props.language === loc}
                bind:group={$props.language}
                onChange={() => changeLocale(loc)}
                hidden
            />
        </ListItem>
    {/each}
</List>
