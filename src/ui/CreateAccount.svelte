<script lang="ts">
    import {createEventDispatcher, getContext, onDestroy, onMount} from 'svelte'
    import {
        ChainDefinition,
        AccountCreationPlugin,
        type UserInterfaceAccountCreationResponse,
    } from '@wharfkit/session'
    import {
        backAction,
        accountCreationContext,
        accountCreationResponse,
        props,
        transitionDirection,
    } from './state'

    import {i18nType} from 'src/lib/translations'
    import Transition from './components/Transition.svelte'
    import AccountPlugin from './createAccount/AccountPlugin.svelte'
    import Blockchain from './login/Blockchain.svelte'
    import Countdown from './components/Countdown.svelte'
    import {derived, Readable} from 'svelte/store'
    const {t} = getContext<i18nType>('i18n')

    let completed = false

    const dispatch = createEventDispatcher<{
        complete: UserInterfaceAccountCreationResponse
        cancel: void
    }>()

    enum Steps {
        done = 'done',
        selectPlugin = 'selectPlugin',
        selectChain = 'selectChain',
    }

    const accountPlugin: Readable<AccountCreationPlugin | undefined> = derived(
        [accountCreationContext, accountCreationResponse],
        ([$currentContext, $currentResponse]) => {
            if (!$currentContext || !$currentResponse) {
                return undefined
            }

            if ($currentContext.accountCreationPlugin) {
                return $currentContext.accountCreationPlugin
            }

            return $currentContext.accountCreationPlugins.find(
                (plugin) => plugin.id === $currentResponse.pluginId
            )
        }
    )

    let chains: Readable<ChainDefinition[]> = derived(
        [accountCreationContext, accountPlugin],
        ([$currentContext, $currentAccountPlugin]) => {
            if (!$currentContext || !$currentAccountPlugin) {
                return []
            }

            // If the selected plugin has an array of supported chains, filter the list of chains
            if ($currentAccountPlugin.config.supportedChains) {
                return $currentContext.chains.filter((chain) => {
                    return (
                        // If the chain is in the list of supported chains
                        $currentAccountPlugin.config.supportedChains?.find((c) => c.equals(chain))
                    )
                })
            }

            return $currentContext.chains
        }
    )

    const accountCreationContextUnsubscribe = accountCreationContext.subscribe((currentContext) => {
        if (currentContext) {
            // If an appName is specified, use it
            $props.subtitle = $t('login.title-app', {
                appName: currentContext.appName,
                default: 'Login to {{appName}}',
            })

            // If only one account creation plugin is available, set it on the response
            if (currentContext.accountCreationPlugins.length === 1) {
                $accountCreationResponse.pluginId = currentContext.accountCreationPlugins[0].id
            }

            // If only one chain is available, set it on the response
            if (currentContext.chain) {
                $accountCreationResponse.chain = currentContext.chain
            } else if (currentContext.chains && currentContext.chains.length === 1) {
                $accountCreationResponse.chain = currentContext.chains[0]
            }
        }
    })

    onMount(() => {
        // TODO: add translation strings
        $props.title = $t('accountCreation.title', {default: 'Create Account'})
    })

    onDestroy(accountCreationContextUnsubscribe)

    const complete = () => {
        if (!completed) {
            completed = true

            // For cases, where no UI interactions are needed,we are giving the UI a chance to set the state before completing
            setTimeout(() => {
                dispatch('complete', $accountCreationResponse)
                backAction.set(undefined)
            }, 100)
        }
    }

    const step = derived(
        [accountCreationResponse, accountPlugin],
        ([$currentResponse, $currentAccountPlugin]) => {
            if (!$currentAccountPlugin) {
                return Steps.selectPlugin
            }

            const {requiresChainSelect} = $currentAccountPlugin.config

            if (!$currentResponse.chain && requiresChainSelect) {
                return Steps.selectChain
            }

            // Return response to kit for the account creation
            complete()
        }
    )

    // TODO: Define the type for this event prop
    const selectPlugin = (e) => {
        $accountCreationResponse.pluginId = e.detail
        $backAction = unselectPlugin
        $transitionDirection = 'rtl'
    }

    const unselectPlugin = (e) => {
        $accountCreationResponse.pluginId = undefined
        $backAction = undefined
        $transitionDirection = 'ltr'
    }

    const selectChain = (e) => {
        $accountCreationResponse.chain = e.detail
        $backAction = unselectChain
        $transitionDirection = 'rtl'
    }

    const unselectChain = (e) => {
        $accountCreationResponse.chain = undefined
        $backAction = unselectPlugin
        $transitionDirection = 'ltr'
    }

    const cancel = () => {
        dispatch('cancel')
    }
</script>

{#if $props && $accountCreationContext}
    {#if $step === Steps.selectPlugin}
        <Transition direction={$transitionDirection}>
            <!-- TODO: Finalize the translation strings here. -->
            <AccountPlugin
                on:select={selectPlugin}
                on:cancel={cancel}
                plugins={$accountCreationContext.accountCreationPlugins}
                title={$t('accountCreation.select.plugin', {default: 'Select a Plugin'})}
            />
        </Transition>
    {:else if $step === Steps.selectChain && $chains}
        <Transition direction={$transitionDirection}>
            <!-- TODO: Finalize the translation strings here. -->
            <Blockchain
                on:select={selectChain}
                on:cancel={unselectChain}
                chains={$chains}
                title={$t('accountCreation.select.chain', {default: 'Select a Blockchain'})}
            />
        </Transition>
    {:else}
        <!-- TODO: add translation string here  -->
        <Countdown
            data={{
                label: $t('accountCreation.countdown', {default: 'Creating Account'}),
            }}
        />
    {/if}
{:else}
    <p>{$t('loading', {default: 'Loading...'})}</p>
{/if}
