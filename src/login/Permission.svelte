<script lang="ts">
    import {
        APIClient,
        ChainDefinition,
        LoginContext,
        PermissionLevel,
        PublicKey,
        UserInterfaceWalletPlugin,
    } from '@wharfkit/session'
    import {createEventDispatcher, onMount} from 'svelte'
    import {writable} from 'svelte/store'

    export let client: APIClient
    export let walletPlugin: UserInterfaceWalletPlugin

    const dispatch = createEventDispatcher<{
        select: PermissionLevel
        cancel: void
    }>()

    let busy = writable(true)
    let permissions: PermissionLevel[] | undefined
    onMount(async () => {
        const response = await client.call({
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
    <h3>Select a permission to use</h3>
    {#if $busy}
        <p>loading...</p>
    {:else if permissions && permissions.length > 0}
        {#each permissions as permission}
            <button on:click={() => dispatch('select', permission)}>{String(permission)}</button>
        {/each}
    {:else}
        <p>No accounts found matching {walletPlugin.metadata.publicKey}</p>
    {/if}
    <button on:click={() => dispatch('cancel')}>cancel</button>
</div>

<style>
</style>
