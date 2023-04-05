<script>
    export let data = {
        label: '[[Unknown Label]]',
        value: '[[Unknown Value]]',
    }
</script>

{#if data}
    <div class="asset">
        <p class="value">{data.value}</p>
        <p class="label">{data.label}</p>
    </div>
{/if}

<style lang="scss">
    .asset {
        padding: 10px 0;
        text-align: center;

        > * {
            margin: 0;
        }
    }

    .value {
        font-size: var(--fs-2);
        font-weight: 600;
        color: var(--body-text-color);
    }

    .label {
        font-size: var(--fs-0);
        font-weight: 400;
        color: var(--body-text-color-variant);
    }
</style>
