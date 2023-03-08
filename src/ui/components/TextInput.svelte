<script lang="ts">
    export let value: string
    export let placeholder: string
    export let onKeyup
    export let autofocus: boolean = false
    export let error: boolean = false
</script>

<input
    class:error
    {autofocus}
    type="text"
    on:keyup|preventDefault={onKeyup}
    bind:value
    {placeholder}
/>

<style lang="scss">
    input {
        height: var(--s3);
        border-radius: var(--border-radius-inner);
        border: 1px solid #00000030;
        padding-inline: var(--s0);
        color: var(--text-color);
        background-color: var(--surface-color);
    }
    input::placeholder {
        font-size: var(--fs-1);
        color: #00000050;
        font-style: italic;
    }
    input:focus-within {
        border: 1px solid transparent;
        outline: 2px solid var(--wharf-blue);
    }
    input.error {
        border: 1px solid var(--color-error);
        color: var(--color-error);
    }
    input.error:focus-within {
        border: 1px solid transparent;
        color: var(--text-color);
    }
</style>
