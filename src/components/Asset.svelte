<script>
    export let data = {
        label: '[[Unknown Label]]',
        value: '[[Unknown Value]]',
    }
</script>

{#if data}
    <h3>{data.value}</h3>
    <h6>{data.label}</h6>
{/if}
