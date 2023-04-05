<script lang="ts">
    type TextareaProps = {
        content?: string
    }

    export let data: TextareaProps = {}
</script>

<div>
    <textarea rows="10" readOnly>{data.content}</textarea>
</div>

<style lang="scss">
    div {
        display: flex;
        background-color: var(--swell-mist);
        padding: var(--space-m);
        border-radius: var(--border-radius-inner);
    }
    textarea {
        flex: 1;
        color: var(--wharf-blue);
        background-color: var(--swell-mist);
        border: none;
        font-size: var(--fs-0);
        resize: none;
    }
</style>
