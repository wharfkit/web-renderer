<script lang="ts">
    import {APIClient, Name, PermissionLevel, UserInterfaceWalletPlugin} from '@wharfkit/session'
    import {createEventDispatcher, getContext, onMount} from 'svelte'
    import {writable} from 'svelte/store'

    import {i18nType} from 'src/lib/translations'

    import {GetAccountsByAuthorizers} from '../../interfaces'

    const {t} = getContext<i18nType>('i18n')

    export let client: APIClient
    export let walletPlugin: UserInterfaceWalletPlugin

    const dispatch = createEventDispatcher<{
        select: PermissionLevel
        cancel: void
    }>()

    let busy = writable(true)
    let input: string = ''
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

<div>
    {#if $busy}
        <p>{$t('loading', {default: 'Loading...'})}</p>
    {:else if permissions && permissions.length > 0}
        {#each permissions as permission}
            <div class="option">
                <button on:click={() => dispatch('select', permission)}>
                    {String(permission)}
                </button>
            </div>
        {/each}
    {:else if walletPlugin.metadata.publicKey}
        <p>
            {$t('login.select.no_match', {
                default: 'No accounts found matching {{publicKey}}',
                publicKey: walletPlugin.metadata.publicKey,
            })}
        </p>
    {:else if !accountName}
        <p>
            {$t('login.enter.account', {
                default: 'Enter account name',
            })}
        </p>
        <input autofocus type="text" on:keyup|preventDefault={handleKeyup} bind:value={input} />
        <button type="submit" on:click={lookup}>
            {$t('login.enter.lookup', {
                default: 'Lookup Account',
            })}
        </button>
        {#if accountNotFound}
            <p>
                {$t('login.enter.not_found', {
                    default: 'Unable to find account',
                })}
            </p>
        {/if}
    {/if}
    <button on:click={() => dispatch('cancel')}>
        {$t('cancel', {default: 'Cancel'})}
    </button>
</div>

<style lang="scss">
    .option {
        padding-top: 27px;
        button {
            cursor: pointer;
            display: block;
            width: 300px;
            height: 65px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            color: var(--button-text-color);
            background-color: var(--button-primary-color);
            border: none;
            box-shadow: none;
            margin: 0 auto;
        }
    }
</style>
