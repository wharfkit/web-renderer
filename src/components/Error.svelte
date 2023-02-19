<script>
    export let error = ''
</script>

{#if error}
    <h2>Error!</h2>
    <p>{error}</p>
{/if}
