<script lang="ts">
    import {APIClient, Name, PermissionLevel, UserInterfaceWalletPlugin} from '@wharfkit/session'
    import {createEventDispatcher, getContext, onMount} from 'svelte'
    import {writable} from 'svelte/store'

    import {i18nType} from 'src/lib/translations'

    import {GetAccountsByAuthorizers} from '../../interfaces'
    import Button from '../components/Button.svelte'
    import List from '../components/List.svelte'
    import ListItem from '../components/ListItem.svelte'
    import TextInput from '../components/TextInput.svelte'
    import WarningMessage from '../components/WarningMessage.svelte'
    import BodyTitle from '../components/BodyTitle.svelte'

    const {t} = getContext<i18nType>('i18n')

    export let client: APIClient
    export let walletPlugin: UserInterfaceWalletPlugin
    export let title: string

    const dispatch = createEventDispatcher<{
        select: PermissionLevel
        cancel: void
    }>()

    let busy = writable(true)
    let input: string = ''
    let prevInput: string = ''
    let accountName: Name | undefined
    let accountNotFound: boolean = false
    let permissions: PermissionLevel[] | undefined

    onMount(async () => {
        if (walletPlugin.config.requiresPermissionSelect) {
            const response = await client.call<GetAccountsByAuthorizers>({
                path: '/v1/chain/get_accounts_by_authorizers',
                params: {
                    keys: [walletPlugin.metadata.publicKey],
                },
            })
            busy.set(false)
            permissions = response.accounts.map((account) =>
                PermissionLevel.from(`${account.account_name}@${account.permission_name}`)
            )
        } else if (walletPlugin.config.requiresPermissionEntry) {
            busy.set(false)
            permissions = []
        }
    })

    async function lookup() {
        busy.set(true)
        try {
            const response = await client.v1.chain.get_account(input)
            if (response.account_name.equals(input)) {
                accountName = response.account_name
                permissions = response.permissions.map((permission) =>
                    PermissionLevel.from(`${response.account_name}@${permission.perm_name}`)
                )
            }
            accountNotFound = false
        } catch (error) {
            accountNotFound = true
        } finally {
            prevInput = input
            busy.set(false)
        }
    }

    function handleKeyup(event) {
        if (event.code == 'Enter') {
            event.preventDefault()
            lookup()
            return false
        }
    }
</script>

<section>
    <BodyTitle>{title}</BodyTitle>
    {#if $busy}
        <p class="loading">{$t('loading', {default: 'Loading...'})}</p>
    {:else if permissions && permissions.length > 0}
        <List>
            {#each permissions as permission}
                <ListItem
                    label={String(permission)}
                    onClick={() => dispatch('select', permission)}
                />
            {/each}
        </List>
    {:else if walletPlugin.metadata.publicKey}
        <WarningMessage
            title={$t('login.select.no_accounts', {
                default: 'No accounts found',
            })}
            details={$t('login.select.no_match', {
                default: 'No accounts found matching {{publicKey}}',
                publicKey: walletPlugin.metadata.publicKey,
            })}
        />
    {:else if !accountName}
        <div class="input-group">
            <TextInput
                onKeyup={handleKeyup}
                bind:value={input}
                placeholder="Account name"
                autofocus={!input}
                error={accountNotFound && input === prevInput}
            />
            {#if accountNotFound}
                <p class="error">
                    {$t('login.enter.not_found', {
                        default: 'Unable to find account',
                    })}
                    {prevInput}
                </p>
            {/if}
            <Button
                data={{
                    variant: 'primary',
                    onClick: lookup,
                    label: $t('login.enter.lookup', {
                        default: 'Lookup Account',
                    }),
                }}
            />
        </div>
    {/if}
</section>

<style lang="scss">
    section {
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
    }

    p.loading {
        margin: 0;
        text-align: center;
        height: var(--space-4xl);
    }

    p.error {
        margin: 0;
        text-align: center;
        color: var(--error-color);
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: var(--space-m);
        margin-top: var(--space-s);
    }
</style>
