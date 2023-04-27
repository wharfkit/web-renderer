<script lang="ts">
    import generateQr from '../../lib/qrcode'
    import Icon from './Icon.svelte'
    export let data = ''

    let dialog: HTMLDialogElement
    let width: number
    let expanded = false

    const toggleExpanded = () => {
        if (expanded) {
            collapse()
        } else {
            expanded = true
            dialog.showModal()
        }
    }

    const collapse = () => {
        dialog.close()
        expanded = false
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
            collapse()
        }
    }

    // When escape keypress is captured, close
    function escapeClose(event) {
        if (event.key === 'Escape') {
            collapse()
        }
    }
</script>

<svelte:window bind:innerWidth={width} />

{#if data}
    <div class="wrapper">
        <div class="qr">
            {@html generateQr(data)}
        </div>
        <dialog
            bind:this={dialog}
            on:click|self={backgroundClose}
            on:keydown|stopPropagation|preventDefault|capture={escapeClose}
        >
            <button class="qr" on:click={collapse}>
                {@html generateQr(data)}
            </button>
        </dialog>

        {#if width > 600}
            <button class="expand" on:click={toggleExpanded}>
                <span class="visually-hidden">Expand</span>
                <Icon name="expand" size="100%" />
            </button>
        {/if}
    </div>
{/if}

<style>
    .wrapper {
        position: relative;
        display: grid;
        background: var(--body-background-color);
        border-radius: var(--space-s);
        padding: var(--space-m);
        box-shadow: var(--qr-border-color);
        aspect-ratio: 1;
        align-self: stretch;
    }

    .qr {
        background: white;
        padding: var(--space-xs);
        border-radius: var(--space-2xs);
    }

    .qr :global(svg) {
        width: 100%;
        height: 100%;
    }

    dialog {
        padding: 0;
        border-radius: var(--space-2xs);
        border: none;
    }

    dialog .qr {
        background-color: white;
        width: min(800px, 80vmin);
    }

    button.expand {
        position: absolute;
        display: grid;
        place-items: center;
        width: fit-content;
        height: fit-content;
        bottom: 0;
        left: 50%;
        right: 50%;
        transform: translateX(-50%) translateY(50%) scale(0.8);
        border: none;
        padding-inline: var(--space-s);
        cursor: pointer;
        background: var(--body-background-color);
        color: var(--body-text-color);
    }

    .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
</style>
