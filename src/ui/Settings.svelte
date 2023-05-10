<script lang="ts">
    import {onMount, getContext} from 'svelte'
    import {backAction, props, router, transitionDirection, initRouter, settings} from './state'
    import {i18nType} from 'src/lib/translations'
    import List from './components/List.svelte'
    import ListItem from './components/ListItem.svelte'
    import Transition from './components/Transition.svelte'
    import About from './settings/About.svelte'
    import Theme from './settings/Theme.svelte'
    import Language from './settings/Language.svelte'
    import languages from 'src/lib/translations/lang.json'

    const settingsRouter = initRouter()

    const {t} = getContext<i18nType>('i18n')

    function closeSettings() {
        $transitionDirection = 'ltr'
        router.back()
        backAction.set(undefined)
    }

    function navigateTo(path: string) {
        $transitionDirection = 'rtl'
        settingsRouter.push(path)
        $props.subtitle = $t(`settings.${path}.title`)
        backAction.set(() => {
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
</script>

<div class="settings-menu">
    {#if !$settingsRouter.path}
        <Transition direction={$transitionDirection}>
            <List>
                <ListItem
                    label="Theme"
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
                <ListItem label="Animations" onClick={() => {}} leadingIcon="waves" />
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
            <Theme />
        </Transition>
    {:else if $settingsRouter.path === 'language'}
        <Transition direction={$transitionDirection}>
            <Language />
        </Transition>
    {/if}
</div>
