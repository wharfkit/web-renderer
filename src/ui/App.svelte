<script lang="ts" context="module">
    import {writable} from 'svelte/store'
    import {UserInterfaceState} from '../interfaces'

    const defaultState = {
        active: false,
        cancelablePromises: [],
        path: 'login',
        previousPaths: [],
    }

    export let state = writable<UserInterfaceState>(defaultState)
</script>

<script lang="ts">
    import Error from './Error.svelte'
    import Prompt from './Prompt.svelte'
    import Login from './Login.svelte'
    import Modal from './components/Modal.svelte'
    import Transact from './Transact.svelte'

    function cancel({detail}) {
        // Reject any promises that are waiting for a response
        if ($state.props) {
            switch ($state.props.id) {
                // The types of props that carry a promise
                case 'login':
                case 'prompt':
                    $state.props.reject(detail)
                    break
                default:
                    break
            }
        }
        // Go back to previous path and remove it from the history
        state.update((current) => ({
            ...current,
            path: current.previousPaths[current.previousPaths.length - 1],
            previousPaths: current.previousPaths.slice(0, -1),
        }))
    }
    function complete({detail}) {
        // Reject any promises that are waiting for a response
        if ($state.props) {
            switch ($state.props.id) {
                // The types of props that carry a promise
                case 'login':
                case 'prompt':
                    $state.props.resolve(detail)
                    break
                default:
                    break
            }
        }
        // Go back to previous path and remove it from the history
        state.update((current) => ({
            ...current,
            path: current.previousPaths[current.previousPaths.length - 1],
            previousPaths: current.previousPaths.slice(0, -1),
        }))
    }
</script>

<Modal {state}>
    {#if $state.active}
        {#if $state.path === 'error'}
            <Error on:cancel={cancel} on:complete={complete} {state} />
        {:else if $state.path === 'login'}
            <Login on:cancel={cancel} on:complete={complete} {state} />
        {:else if $state.path === 'transact'}
            <Transact on:cancel={cancel} on:complete={complete} {state} />
        {:else if $state.path === 'prompt'}
            <Prompt on:cancel={cancel} on:complete={complete} {state} />
        {/if}
    {:else}
        <p>Modal inactive</p>
    {/if}
</Modal>
