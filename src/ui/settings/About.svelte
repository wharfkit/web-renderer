<script lang="ts">
    import {getContext} from 'svelte'
    import {i18nType} from 'src/lib/translations'
    import {version} from '../../../package.json'

    import {WalletPluginMetadata} from '@wharfkit/session'
    import BodyText from '../components/BodyText.svelte'
    import BodyTitle from '../components/BodyTitle.svelte'
    import Link from '../components/Link.svelte'
    import {getThemedLogo} from 'src/lib/utils'
    const {t} = getContext<i18nType>('i18n')

    const wharfLogo = {
        name: 'Wharf',
        logo: {
            light: 'https://assets.wharfkit.com/wharf-brand-assets/logo/svg/wharf-logo-bright-horizontal-vector-no-bg.svg',
            dark: 'https://assets.wharfkit.com/wharf-brand-assets/logo/svg/wharf-logo-dark-horizontal-vector-no-bg.svg',
        },
    } as WalletPluginMetadata
</script>

<div>
    <img src={getThemedLogo(wharfLogo)} alt="wharf logo" class="logo" />
    <BodyTitle>{$t('settings.about.version', {version})}</BodyTitle>
    <BodyText>
        {$t('settings.about.author')}
    </BodyText>
    <Link
        data={{
            button: true,
            variant: 'primary',
            label: $t('settings.about.link'),
            href: 'https://wharfkit.com',
            target: '_blank',
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

    .logo {
        width: 100%;
        max-width: 200px;
        /* margin-bottom: var(--space-m); */
    }
</style>
