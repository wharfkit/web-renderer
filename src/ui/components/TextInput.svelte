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
        box-sizing: border-box;
        height: var(--space-2xl);
        border-radius: var(--border-radius-inner);
        border: 1px solid var(--input-border-color);
        padding-inline: var(--space-m);
        color: var(--body-text-color);
        background-color: var(--body-background-color);
        font-size: var(--fs-1);
    }
    input::placeholder {
        font-size: var(--fs-1);
        color: var(--input-placeholder-color);
        font-style: italic;
    }

    input:hover {
        // border: 2px solid var(--input-border-color-hover);
        border: 1px solid transparent;
        outline: 2px solid var(--input-border-color-hover);
        background-color: var(--input-background-focus);
    }
    input:focus-within {
        border: 1px solid transparent;
        outline: 2px solid var(--input-border-color-focus);
        background-color: var(--input-background-focus);
    }
    input.error {
        border: 1px solid var(--error-color);
        color: var(--error-color);
    }
    input.error:focus-within {
        border: 1px solid transparent;
        color: var(--body-text-color);
    }
</style>
