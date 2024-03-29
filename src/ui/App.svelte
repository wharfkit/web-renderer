<script lang="ts" context="module">
</script>

<script lang="ts">
    import {onDestroy, setContext} from 'svelte'

    import Error from './Error.svelte'
    import Login from './Login.svelte'
    import Prompt from './Prompt.svelte'
    import Settings from './Settings.svelte'
    import Transact from './Transact.svelte'
    import CreateAccount from './CreateAccount.svelte'

    import Countdown from './components/Countdown.svelte'
    import Modal from './components/Modal.svelte'

    import {active, errorDetails, prompt, router, loginPromise, accountCreationPromise, allowSettings} from './state'
    import {i18nType} from 'src/lib/translations'

    // Set the i18n context for all child components
    export let i18n
    setContext<i18nType>('i18n', i18n)

    function cancel({detail}) {
        // Reject any promises that are waiting for a response
        if ($loginPromise) {
            $loginPromise.reject(detail)
        }
        if ($prompt) {
            $prompt.reject(detail)
            prompt.reset()
        }
        router.back()
    }

    function complete({detail}) {
        // Reject any promises that are waiting for a response
        if ($loginPromise) {
            $loginPromise.resolve(detail)
        }
        if ($accountCreationPromise) {
            $accountCreationPromise.resolve(detail)
        }
        if ($prompt) {
            $prompt.resolve(detail)
            prompt.reset()
            router.back()
        }
    }

    const unsubscribe = router.subscribe((current) => {
        if (current && current.path === 'login') {
            allowSettings.set(true)
        } else {
            allowSettings.set(false)
        }
    })

    onDestroy(unsubscribe)
</script>

<Modal>
    {#if $active}
        {#if $errorDetails}
            <Error on:cancel={cancel} on:complete={complete} />
        {:else if $prompt}
            <Prompt on:cancel={cancel} on:complete={complete} />
        {:else if $router.path === 'login'}
            <Login on:cancel={cancel} on:complete={complete} />
        {:else if $router.path === 'transact'}
            <Transact on:cancel={cancel} on:complete={complete} />
        {:else if $router.path === 'settings'}
            <Settings on:cancel={cancel} on:complete={complete} />
        {:else if $router.path === 'create-account'}
            <CreateAccount on:cancel={cancel} on:complete={complete} />
        {:else}
            <Countdown />
        {/if}
    {:else}
        <p>Modal inactive</p>
    {/if}
</Modal>
