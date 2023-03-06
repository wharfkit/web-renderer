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
    @use '../../styles/variables.css';

    dialog {
        font-family: system-ui, ui-sans-serif;
        margin-top: 25vh;
        margin-inline: auto;
        border: none !important;
        border-radius: var(--card-border-radius);
        padding: 0;
        width: 418px;
        box-shadow: 0px 4px 154px rgba(0, 0, 0, 0.35);
        background-color: var(--background-color);
        overflow: hidden;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.75);
    }
    .modal-content {
        padding: var(--s2);
        background-color: var(--surface-color);
        overflow-y: scroll;
    }
</style>
