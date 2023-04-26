<script lang="ts">
    type TextareaProps = {
        content?: string
    }

    export let data: TextareaProps = {}
</script>

<div>
    <textarea readOnly>{data.content}</textarea>
</div>

<style lang="scss">
    div {
        display: flex;
        background-color: var(--text-area-background);
        padding-inline-start: var(--space-m);
        padding: var(--space-m);
        border-radius: var(--border-radius-inner);
    }
    textarea {
        --rows: 9;
        flex: 1;
        color: var(--text-area-text-color);
        background-color: var(--text-area-background);
        border: none;
        font-size: var(--fs-0);
        font-weight: 600;
        line-height: 1.5;
        resize: none;
        opacity: 0.75;
        height: calc(var(--fs-0) * 1.5 * var(--rows) - var(--fs-0) * 1.5 * 0.5);
    }
</style>
