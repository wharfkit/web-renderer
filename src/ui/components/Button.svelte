<script>
    export let data = {}
</script>

<button on:click={data.onclick}>{data.label}</button>

<style lang="scss">
    button {
        cursor: pointer;
        display: block;
        width: 300px;
        max-width: 100%;
        height: 65px;
        line-height: 65px;
        text-decoration: none;
        text-align: center;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        color: var(--button-text-color);
        background-color: var(--button-primary-color);
        border: none;
        box-shadow: none;
        margin: 27px auto 0;
    }
</style>
