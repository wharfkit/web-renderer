<script lang="ts">
    import Header from './Header.svelte'
    import {active, cancelablePromises, resetState, props} from '../state'

    let dialog: HTMLDialogElement

    // Control the dialog element display based on state.active
    active.subscribe((current) => {
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
    <Header title={$props.title} subtitle={$props.subtitle} on:cancel={cancelRequest} />
    <div class="modal-content">
        <slot />
    </div>
</dialog>

<style lang="scss">
    @use '../../styles/index.scss';
    :host {
        all: initial;
        text-justify: auto;
    }

    dialog {
        margin-top: 30%;
        margin-inline: auto;
        border: none !important;
        border-radius: var(--border-radius);
        padding: 0;
        max-width: 418px;
        min-width: 418px;
        box-shadow: 0px 4px 154px rgba(0, 0, 0, 0.35);
        background-color: var(--button-tertiary-color);
        overflow: hidden;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.75);
    }
    .modal-content {
        padding: 50px 59px;
        background-color: white;
        max-height: 418px;
        overflow-y: scroll;
    }
</style>
