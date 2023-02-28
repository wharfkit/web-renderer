<script lang="ts" context="module">
</script>

<script lang="ts">
    import {setContext} from 'svelte'

    import Error from './Error.svelte'
    import Prompt from './Prompt.svelte'
    import Login from './Login.svelte'
    import Modal from './components/Modal.svelte'
    import Transact from './Transact.svelte'

    import {active, errorDetails, prompt, router, loginPromise} from './state'
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
        if ($prompt) {
            $prompt.resolve(detail)
            prompt.reset()
        }
        // Go back to previous path and remove it from the history
        router.back()
    }
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
        {/if}
    {:else}
        <p>Modal inactive</p>
    {/if}
</Modal>
