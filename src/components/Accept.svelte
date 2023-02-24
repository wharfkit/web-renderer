<script lang="ts">
    import {createEventDispatcher} from 'svelte'

    const dispatch = createEventDispatcher<{
        complete: void
        cancel: void
    }>()
</script>

<h2>Accept?</h2>
<button on:click={() => dispatch('complete')}>Accept</button>
<button on:click={() => dispatch('cancel')}>Decline</button>
