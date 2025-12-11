<script lang="ts">
    import Header from './Header.svelte'
    import {active, cancelablePromises, resetState, props, settings} from '../state'
    import {onDestroy} from 'svelte'
    import {Writable, writable} from 'svelte/store'

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
        if (!isInDialog) {
            cancelRequest()
        }
    }

    // When escape keypress is captured, close
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && dialog.open) {
            cancelRequest()
        }
    })
</script>

<dialog
    bind:this={dialog}
    on:mousedown|capture|nonpassive|self|preventDefault={backgroundClose}
    data-theme={$settings.theme}
>
    <Header title={$props.title} subtitle={$props.subtitle} on:cancel={cancelRequest} />
    <div class="modal-content">
        <slot />
    </div>
</dialog>

<style lang="scss">
    @import '../../styles/variables';

    /* Session Key Global Styles */
    :global(.sk-header) {
        text-align: center;
        margin-bottom: 24px;
    }

    :global(.sk-title) {
        font-size: 1.25em;
        font-weight: 600;
        color: var(--body-text-color, #333);
        margin-bottom: 8px;
    }

    :global(.sk-description) {
        font-size: 0.95em;
        color: var(--body-text-color-variant, #666);
        line-height: 1.4;
    }

    :global(.sk-body) {
        margin-bottom: 24px;
    }

    :global(.sk-section-label) {
        font-size: 0.9em;
        color: var(--body-text-color, #333);
        margin-bottom: 12px;
        margin-top: 16px;
    }

    :global(.sk-section-label:first-child) {
        margin-top: 0;
    }

    :global(.sk-info-note) {
        font-size: 0.85em;
        color: var(--body-text-color-variant, #888);
        text-align: center;
        margin-top: 16px;
    }

    :global(.sk-info-note.secondary) {
        font-size: 0.8em;
        color: var(--body-text-color-variant, #888);
        margin-bottom: 0;
    }

    :global(.sk-info-note.primary) {
        color: var(--body-text-color, #333);
        line-height: 1.4;
        margin-bottom: 8px;
    }

    :global(.sk-permissions-list) {
        list-style: none;
        padding: 0;
        margin: 0 0 16px 0;
    }

    :global(.sk-permission-item) {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        border: 1px solid var(--borderColor-default, #d1d5da);
        border-radius: 6px;
        margin-bottom: 8px;
        font-size: 0.9em;
        color: var(--body-text-color);
    }

    :global(.sk-permission-item:last-child) {
        margin-bottom: 0;
    }

    :global(.sk-permission-item.granted) {
        border-left: 3px solid var(--success-color, #22c55e);
    }

    :global(.sk-permission-item.added) {
        border-left: 3px solid var(--success-color, #22c55e);
    }

    :global(.sk-permission-item.removed) {
        border-left: 3px solid var(--error-color, #ef4444);
    }

    :global(.sk-checkmark) {
        color: var(--success-color, #22c55e);
        font-weight: bold;
    }

    :global(.sk-indicator) {
        font-weight: bold;
        font-size: 1.1em;
        min-width: 16px;
        text-align: center;
    }

    :global(.sk-permission-item.added .sk-indicator) {
        color: var(--success-color, #22c55e);
    }

    :global(.sk-permission-item.removed .sk-indicator) {
        color: var(--error-color, #ef4444);
    }

    dialog {
        --margin-top: var(--space-xl);
        font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            'Open Sans',
            'Helvetica Neue',
            sans-serif;
        margin-bottom: 0;
        margin-top: var(--margin-top);
        margin-inline: auto;
        border: none !important;
        border-radius: var(--border-radius-outer);
        padding: 0;
        width: min(var(--space-7xl), 100vw - var(--space-m));
        box-shadow: 0px 4px 154px rgba(0, 0, 0, 0.35);
        background: none;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.75);
    }
    .modal-content {
        --max-modal-content-height: calc(
            100svh - var(--header-height) - var(--margin-top) - var(--margin-top)
        );
        padding: var(--space-m);
        padding-bottom: var(--space-l);
        background-color: var(--body-background-color);
        overflow: hidden;
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
