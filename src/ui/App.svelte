<script lang="ts" context="module">
</script>

<script lang="ts">
    import {setContext, onMount} from 'svelte'

    import Error from './Error.svelte'
    import Prompt from './Prompt.svelte'
    import Login from './Login.svelte'
    import Modal from './components/Modal.svelte'
    import Transact from './Transact.svelte'
    import Settings from './Settings.svelte'

    import {active, errorDetails, prompt, router, loginPromise, props} from './state'
    import {i18nType} from 'src/lib/translations'

    import {getSetting} from '../lib/utils'

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

    onMount(() => {
        // Initialize the theme
        const theme = getSetting('theme', undefined)

        if (theme) {
            $props.theme = theme
        }
    })
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
        {/if}
    {:else}
        <p>Modal inactive</p>
    {/if}
</Modal>
