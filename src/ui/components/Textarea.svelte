<script lang="ts">
    type TextareaProps = {
        content?: string
    }

    export let data: TextareaProps = {}
</script>

<textarea rows="10">{data.content}</textarea>

<style lang="scss">
    textarea {
        width: 100%;
    }
</style>
