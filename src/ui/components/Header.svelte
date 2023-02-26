<script lang="ts">
    export let title: string = 'Wharf'
    export let status: string = '...'
</script>

<div class="modal-header">
    <h2>{title}</h2>
    <h4>{status}</h4>
</div>

<style lang="scss">
    .modal-header {
        min-height: 80px;
        text-align: center;
        color: var(--button-text-color);
        background: var(--button-tertiary-color);
        h2 {
            font-size: 20px;
            font-weight: 700;
            line-height: 24px;
            padding: 14px 0 7px;
            margin: 0;
        }
        h4 {
            font-size: 12px;
            line-height: 15px;
            margin: 0;
        }
    }
</style>
