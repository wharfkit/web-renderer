<script lang="ts">
    import {writable} from 'svelte/store'
    import {onMount, getContext} from 'svelte'
    import {backAction, props, router, transitionDirection} from './state'
    import BodyTitle from './components/BodyTitle.svelte'
    import {i18nType} from 'src/lib/translations'
    import List from './components/List.svelte'
    import ListItem from './components/ListItem.svelte'
    import Transition from './components/Transition.svelte'

    const {t} = getContext<i18nType>('i18n')

    const THEMES = ['automatic', 'dark', 'light']
    const LANGUAGES = ['en', 'ch', 'kr']
    const ANIMATIONS = ['disabled', 'enabled']
    const WALLETS = ['anchor', 'cleos', 'cloud', 'mock']

    const getSetting = (key: string, defaultValue: any) => {
        const value = localStorage.getItem(key)
        return value !== null ? JSON.parse(value) : defaultValue
    }

    const setSetting = (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value))
    }

    // const theme = getSetting('theme', THEMES[0])
    // const language = getSetting('language', LANGUAGES[0])
    // const animations = getSetting('animations', ANIMATIONS[1])
    // const defaultWallet = getSetting('defaultWallet', WALLETS[0])

    // const selectedTheme = writable(theme)
    // const selectedLanguage = writable(language)
    // const selectedAnimations = writable(animations)
    // const selectedDefaultWallet = writable(defaultWallet)

    // selectedTheme.subscribe((value) => setSetting('theme', value))
    // selectedLanguage.subscribe((value) => setSetting('language', value))
    // selectedAnimations.subscribe((value) => setSetting('animations', value))
    // selectedDefaultWallet.subscribe((value) => setSetting('defaultWallet', value))

    onMount(() => {
        backAction.set(() => {
            $transitionDirection = 'ltr'
            router.back()
            backAction.set(undefined)
        })

        $props.title = $t('settings.title', {default: 'Settings'})
        $props.subtitle = $t('settings.subtitle')
        $transitionDirection = 'ltr'
        // settings.theme = theme
        // settings.language = language
        // settings.animations = animations
        // settings.defaultWallet = defaultWallet
    })
</script>

<div class="settings-menu">
    <Transition direction={$transitionDirection}>
        <List>
            <ListItem label="Theme" onClick={() => {}} leadingIcon="theme" />
            <ListItem label="Language" onClick={() => {}} leadingIcon="globe" />
            <ListItem label="Animations" onClick={() => {}} leadingIcon="waves" />
            <ListItem label="About" onClick={() => {}} leadingIcon="info" />
            <ListItem
                label="Report an issue on GitHub"
                onClick={() => {}}
                leadingIcon="github"
                trailingIcon="external-link"
            />
        </List>
    </Transition>
</div>
