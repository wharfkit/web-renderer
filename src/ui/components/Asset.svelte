<script>
    export let data = {
        label: '[[Unknown Label]]',
        value: '[[Unknown Value]]',
    }
</script>

{#if data}
    <div class="asset">
        <h2>{data.value}</h2>
        <h6>{data.label}</h6>
    </div>
{/if}

<style lang="scss">
    .asset {
        padding: 10px 0;
        text-align: center;
        h2,
        h6 {
            margin: 0;
        }
    }
</style>
