<script lang="ts">
    import {
        Checksum256Type,
        PermissionLevelType,
        UserInterfaceWalletPlugin,
        ChainDefinition,
        APIClient,
    } from '@wharfkit/session'
    import {createEventDispatcher} from 'svelte'
    import {derived, Readable, Writable, writable} from 'svelte/store'
    import {onMount} from 'svelte'

    import Blockchain from './login/Blockchain.svelte'
    import Permission from './login/Permission.svelte'
    import Wallet from './login/Wallet.svelte'
    import {UserInterfaceState} from '../interfaces'

    export let state: Writable<UserInterfaceState>
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

    const chain: Readable<ChainDefinition | undefined> = derived(
        [response, state],
        ([$currentResponse, $currentState]) => {
            if (
                $currentResponse &&
                $currentState &&
                $currentState.props &&
                $currentState.props.id === 'login'
            ) {
                const {context} = $currentState.props
                if ($currentResponse.chainId === undefined) {
                    return undefined
                }
                return context.chains.find((c) => c.id === $currentResponse.chainId)
            }
        }
    )

    const client: Readable<APIClient | undefined> = derived(
        [chain, state],
        ([$currentChain, $currentState]) => {
            if (
                $currentChain &&
                $currentState &&
                $currentState.props &&
                $currentState.props.id === 'login'
            ) {
                const {context} = $currentState.props
                if ($currentChain === undefined) {
                    return undefined
                }
                return context.getClient($currentChain)
            }
        }
    )

    const walletPlugin: Readable<UserInterfaceWalletPlugin | undefined> = derived(
        [response, state],
        ([$response, $currentState]) => {
            if (
                $response &&
                $currentState &&
                $currentState.props &&
                $currentState.props.id === 'login'
            ) {
                const {context} = $currentState.props
                if ($response.walletPluginIndex === undefined) {
                    return undefined
                }
                return context.walletPlugins[$response.walletPluginIndex]
            }
        }
    )

    let chains: Readable<ChainDefinition[] | undefined> = derived(
        [state, walletPlugin],
        ([$currentState, $currentWalletPlugin]) => {
            // Otherwise return all chains provided by the app
            if (!$currentState || !$currentState.props || $currentState.props.id !== 'login') {
                return []
            }
            const {context} = $currentState.props
            // If the selected WalletPlugin has an array of supported chains, filter the list of chains
            if ($currentWalletPlugin && $currentWalletPlugin.config.supportedChains) {
                return context.chains.filter((chain) => {
                    return (
                        !$currentWalletPlugin.config.supportedChains ||
                        $currentWalletPlugin.config.supportedChains.includes(String(chain.id))
                    )
                })
            }
            return context.chains
        }
    )
    onMount(() => {
        if ($state.props && $state.props.id === 'login') {
            const {context} = $state.props
            if (context.chain) {
                response.update((r) => {
                    if (context.chain) {
                        return {
                            ...r,
                            chainId: context.chain.id,
                        }
                    }
                    return r
                })
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
    })

    const step = derived([response, walletPlugin], ([$currentResponse, $currentWalletPlugin]) => {
        if (!$currentWalletPlugin) {
            return Steps.selectWallet
        }

        const {requiresChainSelect, requiresPermissionSelect, supportedChains} =
            $currentWalletPlugin.config

        if (!$currentResponse.chainId && supportedChains && supportedChains.length === 1) {
            response.update((r) => ({...r, chainId: supportedChains[0]}))
            return Steps.selectChain
        } else if (!$currentResponse.chainId && requiresChainSelect) {
            return Steps.selectChain
        } else if (!$currentResponse.permissionLevel && requiresPermissionSelect) {
            return Steps.selectPermission
        }

        // We have completed, return response to kit for the WalletPlugin to trigger
        complete()
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

    const cancel = () => {
        dispatch('cancel')
    }
</script>

{#if $state.props && $state.props.id === 'login'}
    {#if $step === Steps.selectWallet}
        <Wallet
            on:select={selectWallet}
            on:cancel={cancel}
            wallets={$state.props?.context.walletPlugins}
        />
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
        <p>Login Complete!</p>
    {/if}
{:else}
    <p>Loading...</p>
{/if}
