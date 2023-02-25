<script lang="ts" context="module">
    export let dialog
</script>

<script lang="ts">
    import {ComponentType, SvelteComponentTyped} from 'svelte'
    import {onMount} from 'svelte'
    import {message} from './Modal'

    interface Prompt {
        component: ComponentType<SvelteComponentTyped>
        props: any
        abort: (reason: string) => any
        complete: (e: any) => any
        cancel: (reason: string) => any
    }

    export let prompt: Prompt

    onMount(() => {
        dialog.showModal()
    })

    function backgroundClose(event) {
        var rect = dialog.getBoundingClientRect()
        var isInDialog =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width
        if (!isInDialog) {
            dialog.close()
            console.log('modal closed via background click')
            if (prompt.abort) {
                prompt.abort('prompt aborted via background click')
                console.log('prompt aborted via background click')
            }
        }
    }

    function escapeClose(event) {
        if (event.key === 'Escape') {
            dialog.close()
            console.log('modal closed via keypress')
            if (prompt.abort) {
                prompt.abort('prompt aborted via keypress')
                console.log('prompt aborted via keypress')
            }
        }
    }
</script>

<dialog
    bind:this={dialog}
    on:click|capture|nonpassive={backgroundClose}
    on:keyup|preventDefault|capture|nonpassive={escapeClose}
>
    <div class="modal-header">header stuff!</div>
    <div class="modal-content">
        {#if prompt}
            <svelte:component
                this={prompt.component}
                on:complete={prompt.complete}
                on:cancel={prompt.cancel}
                {...prompt.props}
            />
        {:else}
            <div class="modal-content">{$message}</div>
        {/if}
    </div>
</dialog>

<style lang="scss">
    :host {
        // Shapes
        --border-radius: 24px;

        // Colors
        --foreground-color: #000;
        --background-color: #f2f8f2;

        --button-text-color: #fff;
        --button-primary-color: #1cb095;
        --button-secondary-color: #3d435a;
        --button-tertiary-color: #494e62;

        // Text
        --base-font: 14px;
    }
    dialog {
        border: none !important;
        border-radius: var(--border-radius);
        padding: 0;
        max-width: 418px;
        box-shadow: 0px 4px 154px rgba(0, 0, 0, 0.35);
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.65);
    }
    .modal-header {
        min-height: 80px;
        line-height: 80px;
        font-weight: 700;
        font-size: 20px;
        text-align: center;
        color: var(--button-text-color);
        background: var(--button-tertiary-color);
    }
    .modal-content {
        padding: 50px 59px;
    }
</style>
