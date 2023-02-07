<svelte:options tag="wharfkit-modal-button" />

<script>
    export let data = ''
    export let label = 'Click me'
</script>

<a href={data}>{label}</a>
