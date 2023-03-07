<script lang="ts">
    import {APIClient, PermissionLevel, UserInterfaceWalletPlugin} from '@wharfkit/session'
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
    let permissions: PermissionLevel[] | undefined
    onMount(async () => {
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
    })
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
    {:else}
        <p>
            {$t('login.select.no_match', {
                default: 'No accounts found matching {{publicKey}}',
                publicKey: walletPlugin.metadata.publicKey,
            })}
        </p>
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
            // height: 65px;
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
