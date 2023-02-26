<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import {Writable} from 'svelte/store'

    import {UserInterfaceState} from '../interfaces'

    export let state: Writable<UserInterfaceState>

    const dispatch = createEventDispatcher<{
        complete: void
        cancel: void
    }>()

    const complete = () => {
        dispatch('complete')
    }

    const cancel = () => {
        dispatch('cancel')
    }
</script>

<p>Doing transact stuffs</p>
{JSON.stringify($state)}
