<script lang="ts">
    import {APIClient, PermissionLevel, UserInterfaceWalletPlugin} from '@wharfkit/session'
    import {createEventDispatcher, getContext, onMount} from 'svelte'
    import {writable} from 'svelte/store'

    import {i18nType} from 'src/lib/translations'

    import {GetAccountsByAuthorizers} from '../../interfaces'
    import Button from '../components/Button.svelte'
    import List from '../components/List.svelte'
    import ListItem from '../components/ListItem.svelte'

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
        <List>
            {#each permissions as permission}
                <ListItem
                    label={String(permission)}
                    onClick={() => dispatch('select', permission)}
                />
            {/each}
        </List>
    {:else}
        <p>
            {$t('login.select.no_match', {
                default: 'No accounts found matching {{publicKey}}',
                publicKey: walletPlugin.metadata.publicKey,
            })}
        </p>
    {/if}

    <Button
        variant="secondary"
        label={$t('cancel', {default: 'Cancel'})}
        onClick={() => dispatch('cancel')}
    />
</div>

<style lang="scss">
    div {
        display: flex;
        flex-direction: column;
        gap: var(--s1);
    }
</style>
