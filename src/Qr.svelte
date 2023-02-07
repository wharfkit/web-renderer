<svelte:options tag="wharfkit-modal-qrcode" />

<script>
    import generateQr from './qrcode'
    export let data = ''
</script>

{#if data}
    {@html generateQr(data)}
{/if}

<style>
    svg {
        width: 300px;
    }
</style>
