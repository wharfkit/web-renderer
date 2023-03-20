<script lang="ts" context="module">
</script>

<script lang="ts">
    import {setContext} from 'svelte'

    import ErrorPage from './Error.svelte'
    import Prompt from './Prompt.svelte'
    import Login from './Login.svelte'
    import Modal from './components/Modal.svelte'
    import Transact from './Transact.svelte'

    import {active, errorDetails, prompt, router, loginPromise} from './state'
    import {i18nType} from 'src/lib/translations'
    import type {UserInterfaceLoginResponse} from '@wharfkit/session'

    // Set the i18n context for all child components
    export let i18n
    setContext<i18nType>('i18n', i18n)

    let cancelled = false
    let completed = false
    let completedDetails: UserInterfaceLoginResponse | undefined

    function handleCancel() {
        cancelled = true
    }

    function handleComplete({detail}) {
        completed = true
        completedDetails = detail
    }

    function cancel() {
        // Reject any promises that are waiting for a response
        if ($loginPromise) {
            $loginPromise.reject(new Error('User cancelled.'))
        }
        if ($prompt) {
            $prompt.reject(new Error('User cancelled.'))
            prompt.reset()
        }
        router.back()

        cancelled = false
    }

    function complete() {
        // Reject any promises that are waiting for a response
        if ($loginPromise) {
            $loginPromise.resolve(completedDetails!)
        }
        if ($prompt) {
            $prompt.resolve(completedDetails!)
            prompt.reset()
        }
        // Go back to previous path and remove it from the history
        router.back()

        completed = false
    }

    $: $loginPromise, $prompt, cancelled && cancel()

    $: $loginPromise, $prompt, completed && complete()
</script>

<Modal>
    {#if $active}
        {#if $errorDetails}
            <ErrorPage on:cancel={handleCancel} on:complete={handleComplete} />
        {:else if $prompt}
            <Prompt on:cancel={handleCancel} on:complete={handleComplete} />
        {:else if $router.path === 'login'}
            <Login on:cancel={handleCancel} on:complete={handleComplete} />
        {:else if $router.path === 'transact'}
            <Transact on:cancel={handleCancel} on:complete={handleComplete} />
        {/if}
    {:else}
        <p>Modal inactive</p>
    {/if}
</Modal>
