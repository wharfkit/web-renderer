<script lang="ts">
    import {onMount, getContext} from 'svelte'
    import {backAction, props, router, transitionDirection, initRouter, settings} from './state'
    import {i18nType} from 'src/lib/translations'
    import List from './components/List.svelte'
    import ListItem from './components/ListItem.svelte'
    import Transition from './components/Transition.svelte'
    import About from './settings/About.svelte'
    import languages from 'src/lib/translations/lang.json'
    import Selector from './settings/Selector.svelte'
    import type {SelectorOptions, Theme} from '../types'
    import {get} from 'svelte/store'

    const settingsRouter = initRouter()

    const {t, setLocale} = getContext<i18nType>('i18n')

    function closeSettings() {
        $transitionDirection = 'ltr'
        router.back()
        backAction.set(undefined)
    }

    function navigateTo(path: string) {
        console.log($props)
        $transitionDirection = 'rtl'
        settingsRouter.push(path)
        $props.subtitle = $t(`settings.${path}.title`)
        backAction.set(() => {
            console.log($props)
            $transitionDirection = 'ltr'
            settingsRouter.back()
            backAction.set(closeSettings)
            $props.subtitle = undefined
        })
    }

    onMount(() => {
        backAction.set(closeSettings)
        $props.title = $t('settings.title')
        $props.subtitle = undefined
        $transitionDirection = 'rtl'
    })

    $: animationOptions = [
        {
            label: $t('settings.animations.enabled'),
            value: true,
        },
        {
            label: $t('settings.animations.disabled'),
            value: false,
        },
    ]

    $: languageOptions = Object.keys(languages).map((lang) => ({
        label: languages[lang],
        value: lang,
    }))

    $: themeOptions = [
        {
            label: $t('settings.theme.automatic'),
            value: undefined,
        },
        {
            label: $t('settings.theme.light'),
            value: 'light',
        },
        {
            label: $t('settings.theme.dark'),
            value: 'dark',
        },
    ]

    async function changeLanguage(locale: string) {
        const success = await setLocale(locale)
        if (success) {
            settings.set({
                ...get(settings),
                language: locale,
            })
            // Update the header immediately
            $props.title = $t('settings.title')
            $props.subtitle = $t('settings.language.title')
        }
    }
</script>

<div class="settings-menu">
    {#if !$settingsRouter.path}
        <Transition direction={$transitionDirection}>
            <List>
                <ListItem
                    label={$t(`settings.theme.title`)}
                    onClick={() => navigateTo('theme')}
                    leadingIcon="theme"
                    value={$settings.theme
                        ? $t(`settings.theme.${$settings.theme}`)
                        : $t('settings.theme.automatic')}
                />
                <ListItem
                    label="Language"
                    onClick={() => navigateTo('language')}
                    leadingIcon="globe"
                    value={languages[$settings.language]}
                />
                <ListItem
                    label={$t(`settings.animations.title`)}
                    onClick={() => navigateTo('animations')}
                    leadingIcon="waves"
                    value={$settings.animations
                        ? $t(`settings.animations.enabled`)
                        : $t('settings.animations.disabled')}
                />
                <ListItem label="About" onClick={() => navigateTo('about')} leadingIcon="info" />
                <ListItem
                    label="Report an issue on GitHub"
                    onClick={() => {}}
                    leadingIcon="github"
                    trailingIcon="external-link"
                />
            </List>
        </Transition>
    {/if}
    {#if $settingsRouter.path === 'about'}
        <Transition direction={$transitionDirection}>
            <About />
        </Transition>
    {:else if $settingsRouter.path === 'theme'}
        <Transition direction={$transitionDirection}>
            <Selector setting="theme" options={themeOptions} />
        </Transition>
    {:else if $settingsRouter.path === 'language'}
        <Transition direction={$transitionDirection}>
            <Selector
                setting="language"
                options={languageOptions}
                onChange={(locale) => changeLanguage(locale)}
            />
        </Transition>
    {:else if $settingsRouter.path === 'animations'}
        <Transition direction={$transitionDirection}>
            <Selector setting="animations" options={animationOptions} />
        </Transition>
    {/if}
</div>
