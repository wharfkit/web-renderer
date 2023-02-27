<script lang="ts" context="module">
</script>

<script lang="ts">
    import Error from './Error.svelte'
    import Prompt from './Prompt.svelte'
    import Login from './Login.svelte'
    import Modal from './components/Modal.svelte'
    import Transact from './Transact.svelte'

    import {active, errorDetails, prompt, router, loginPromise} from './state'

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
        {#if $prompt}
            <Prompt on:cancel={cancel} on:complete={complete} />
        {:else if $errorDetails}
            <Error on:cancel={cancel} on:complete={complete} />
        {:else if $router.path === 'login'}
            <Login on:cancel={cancel} on:complete={complete} />
        {:else if $router.path === 'transact'}
            <Transact on:cancel={cancel} on:complete={complete} />
        {/if}
    {:else}
        <p>Modal inactive</p>
    {/if}
</Modal>
