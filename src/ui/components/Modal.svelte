<script lang="ts">
    import Header from './Header.svelte'
    import {active, cancelablePromises, resetState, props, colorScheme} from '../state'
    import {onDestroy} from 'svelte'

    let dialog: HTMLDialogElement

    // Control the dialog element display based on state.active
    const unsubscribe = active.subscribe((current) => {
        if (dialog) {
            if (current && !dialog.open) {
                dialog.showModal()
            } else if (!current && dialog.open) {
                dialog.close()
                resetState()
            }
        }
    })

    onDestroy(unsubscribe)

    // Perform work required to cancel request
    function cancelRequest() {
        // Cancel any pending promises
        $cancelablePromises.map((f) => f('Modal closed', true))
        // Update state to close the modal
        active.set(false)
    }

    // When background is clicked outside of modal, close
    function backgroundClose(event) {
        var rect = dialog.getBoundingClientRect()
        var isInDialog =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width
        if (event.target === dialog && !isInDialog) {
            cancelRequest()
        }
    }

    // When escape keypress is captured, close
    function escapeClose(event) {
        if (event.key === 'Escape') {
            cancelRequest()
        }
    }
</script>

<dialog
    bind:this={dialog}
    on:click|capture|nonpassive={backgroundClose}
    on:keyup|preventDefault|capture|nonpassive={escapeClose}
    data-theme={$colorScheme}
>
    <Header title={$props.title} subtitle={$props.subtitle} on:cancel={cancelRequest} />
    <div class="modal-content">
        <slot />
    </div>
</dialog>

<style lang="scss">
    @import '../../styles/variables';

    dialog {
        --margin-top: var(--space-xl);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin-bottom: 0;
        margin-top: var(--margin-top);
        margin-inline: auto;
        border: none !important;
        border-radius: var(--border-radius-outer);
        padding: 0;
        width: min(var(--space-7xl), 100vw - var(--space-m));
        box-shadow: 0px 4px 154px rgba(0, 0, 0, 0.35);
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.75);
    }
    .modal-content {
        --max-modal-content-height: calc(
            100svh - var(--header-height) - var(--margin-top) - var(--margin-top)
        );
        padding: var(--space-m);
        background-color: var(--body-background-color);
        overflow-y: scroll;
        max-height: var(--max-modal-content-height);

        // Give Chrome some nicer scrollbars
        scrollbar-gutter: stable both-edges;
        scrollbar-color: var(--header-background-color);
    }

    .modal-content::-webkit-scrollbar {
        width: 2px;
        background-color: var(--body-background-color);
    }
    .modal-content::-webkit-scrollbar-thumb {
        background: var(--header-background-color);
    }
</style>
