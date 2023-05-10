<script lang="ts">
    import {getContext} from 'svelte'
    import {i18nType} from 'src/lib/translations'

    import {WalletPluginMetadata} from '@wharfkit/session'
    import BodyText from '../components/BodyText.svelte'
    import BodyTitle from '../components/BodyTitle.svelte'
    import Link from '../components/Link.svelte'
    import {getThemedLogo} from 'src/lib/utils'
    const {t} = getContext<i18nType>('i18n')

    const wharfLogo = {
        name: 'Wharf',
        logo: {
            light: 'https://wharfkit.com/_app/immutable/assets/Wharf-logo-horizontal-057c7d1e.svg',
            dark: 'https://wharfkit.com/_app/immutable/assets/Wharf-logo-horizontal-057c7d1e.svg',
        },
    } as WalletPluginMetadata
</script>

<div>
    <img src={getThemedLogo(wharfLogo)} alt="Greymass" class="w-32 h-32 mx-auto" />
    <BodyTitle>{$t('settings.about.version', {version: '1.39.5'})}</BodyTitle>
    <BodyText>
        {$t('settings.about.author')}
    </BodyText>
    <Link
        data={{
            button: true,
            variant: 'primary',
            label: $t('settings.about.link'),
            href: 'https://wharfkit.com',
        }}
    />
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-m);
    }
</style>
