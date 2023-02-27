<script lang="ts">
    import {createEventDispatcher} from 'svelte'

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

<p>Doing transact stuffs - cool animation!</p>
