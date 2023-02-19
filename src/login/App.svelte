<script lang="ts">
    import {
        Checksum256Type,
        LoginContext,
        PermissionLevelType,
        WalletPluginConfig,
        UserInterfaceWalletPlugin,
        ChainDefinition,
        APIClient,
    } from '@wharfkit/session'
    import {createEventDispatcher} from 'svelte'
    import {derived, Readable, writable} from 'svelte/store'
    import {onMount} from 'svelte'

    import Blockchain from './Blockchain.svelte'
    import Permission from './Permission.svelte'
    import Wallet from './Wallet.svelte'

    export let context: LoginContext
    let completed = false

    const dispatch = createEventDispatcher<{
        complete: UserInterfaceLoginResponse
        cancel: void
    }>()

    interface UserInterfaceLoginResponse {
        chainId?: Checksum256Type
        permissionLevel?: PermissionLevelType
        walletPluginIndex?: number
    }

    const response = writable<UserInterfaceLoginResponse>({
        chainId: undefined,
        permissionLevel: undefined,
        walletPluginIndex: undefined,
    })

    enum Steps {
        done = 'done',
        selectChain = 'selectChain',
        selectPermission = 'selectPermission',
        selectWallet = 'selectWallet',
    }

    const chain: Readable<ChainDefinition | undefined> = derived(response, ($response) => {
        if ($response.chainId === undefined) {
            return undefined
        }
        return context.chains.find((c) => c.id === $response.chainId)
    })

    const client: Readable<APIClient | undefined> = derived(chain, ($chain) => {
        if ($chain === undefined) {
            return undefined
        }
        return context.getClient($chain)
    })

    const walletPlugin: Readable<UserInterfaceWalletPlugin | undefined> = derived(
        response,
        ($response) => {
            if ($response.walletPluginIndex === undefined) {
                return undefined
            }
            return context.walletPlugins[$response.walletPluginIndex]
        }
    )

    let chains: Readable<ChainDefinition[] | undefined>
    onMount(() => {
        if (context) {
            if (context.chain) {
                response.update((r) => ({...r, chainId: context.chain.id}))
            }
            if (context.chains.length === 1) {
                response.update((r) => ({...r, chainId: context.chains[0].id}))
            }
            if (context.permissionLevel) {
                response.update((r) => ({...r, permissionLevel: context.permissionLevel}))
            }
            if (context.walletPlugins.length === 1) {
                response.update((r) => ({...r, walletPluginIndex: 0}))
            }
        }
        chains = derived(walletPlugin, ($walletPlugin) => {
            // If the selected WalletPlugin has an array of supported chains, filter the list of chains
            if ($walletPlugin && $walletPlugin.config.supportedChains) {
                return context.chains.filter((chain) => {
                    return (
                        !$walletPlugin.config.supportedChains ||
                        $walletPlugin.config.supportedChains.includes(String(chain.id))
                    )
                })
            }
            // Otherwise return all chains provided by the app
            if (!context) {
                return []
            }
            return context.chains
        })
    })

    const step = derived([response, walletPlugin], ([$response, $walletPlugin]) => {
        if (!$walletPlugin) {
            return Steps.selectWallet
        }
        // if ($walletPlugin.config.supportedChains) {
        //     chains = walletPlugin.config.supportedChains.map((c) => this.getChainDefinition(c))

        const {requiresChainSelect, requiresPermissionSelect, supportedChains} =
            $walletPlugin.config
        if (!$response.chainId && supportedChains && supportedChains.length === 1) {
            response.update((r) => ({...r, chainId: supportedChains[0]}))
            return Steps.selectChain
        } else if (!$response.chainId && requiresChainSelect) {
            return Steps.selectChain
        } else if (!$response.permissionLevel && requiresPermissionSelect) {
            return Steps.selectPermission
        }
        // We have completed, return response to kit for the WalletPlugin to trigger
        complete()

        // if (walletPlugin.config.supportedChains) {
        //     if (!chain) {
        //         throw new Error(
        //             `The wallet plugin '${walletPlugin.metadata.name}' requires a chain to be selected.`
        //         )
        //     }
        //     if (!walletPlugin.config.supportedChains.includes(String(chain.id))) {
        //         throw new Error(
        //             `The wallet plugin '${walletPlugin.metadata.name}' does not support the chain '${chain.id}'`
        //         )
        //     }
        // }
    })

    const selectChain = (e) => response.update((r) => ({...r, chainId: e.detail}))
    const unselectChain = () => response.update((r) => ({...r, chainId: undefined}))

    const selectPermission = (e) => response.update((r) => ({...r, permissionLevel: e.detail}))
    const unselectPermission = () => response.update((r) => ({...r, permissionLevel: undefined}))

    const selectWallet = (e) => response.update((r) => ({...r, walletPluginIndex: e.detail}))
    const unselectWallet = () => response.update((r) => ({...r, walletPluginIndex: undefined}))

    const complete = () => {
        if (!completed) {
            completed = true
            dispatch('complete', $response)
        }
    }
</script>

{#if context}
    {#if $step === Steps.selectWallet}
        <Wallet on:select={selectWallet} wallets={context.walletPlugins} />
    {:else if $step === Steps.selectChain && $chains}
        <Blockchain on:select={selectChain} on:cancel={unselectWallet} chains={$chains} />
    {:else if $step === Steps.selectPermission && $client && $walletPlugin}
        <Permission
            on:select={selectPermission}
            on:cancel={unselectChain}
            client={$client}
            walletPlugin={$walletPlugin}
        />
    {:else}
        <p>Done!?!?@!</p>
    {/if}
{:else}
    <p>Loading...</p>
{/if}
