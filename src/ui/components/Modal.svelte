<script lang="ts">
    import Header from './Header.svelte'
    import {active, cancelablePromises, resetState} from '../state'

    let dialog: HTMLDialogElement

    // Control the dialog element display based on state.active
    active.subscribe((current) => {
        console.log('active changed', current)
        if (dialog) {
            if (current && !dialog.open) {
                dialog.showModal()
            } else if (!current && dialog.open) {
                dialog.close()
                resetState()
            }
        }
    })

    // Perform work required to cancel request
    function cancelRequest() {
        // Cancel any pending promises
        console.log($cancelablePromises)
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
>
    <Header on:cancel={cancelRequest} />
    <div class="modal-content">
        <slot />
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

        font-family: system-ui, ui-sans-serif;
    }

    dialog {
        border: none !important;
        border-radius: var(--border-radius);
        padding: 0;
        max-width: 418px;
        min-width: 418px;
        box-shadow: 0px 4px 154px rgba(0, 0, 0, 0.35);
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.75);
    }
    .modal-content {
        padding: 50px 59px;
    }
</style>
