<script lang="ts">
    import generateQr from '../../lib/qrcode'
    export let data = ''
</script>

{#if data}
    {@html generateQr(data)}
{/if}
