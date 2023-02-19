<script>
    import generateQr from '../qrcode'
    export let data = ''
</script>

{#if data}
    {@html generateQr(data)}
{/if}
