<script lang="ts">
    import {fade} from 'svelte/transition'
    import generateQr from '../../lib/qrcode'
    import Icon from './Icon.svelte'
    import {cubicInOut} from 'svelte/easing'
    import {onMount} from 'svelte'
    import {writable} from 'svelte/store'
    export let data = ''

    let dialog: HTMLDialogElement
    let expanded = false
    let copied = false

    const qrcode = writable()
    onMount(() => {
        try {
            qrcode.set(generateQr(data))
        } catch (e) {
            console.error('Error rendering QR code', e)
        }
    })

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

    // Copy data to clipboard if supported. Requires a secure context e.g. https
    function copyToClipboard(data: string) {
        if (!navigator.clipboard) return
        navigator.clipboard.writeText(data)
        copied = true
        setTimeout(() => (copied = false), 1200)
    }
</script>

{#if data}
    <div class="wrapper">
        {#if $qrcode}
            <div class="main qr">
                {@html $qrcode}
            </div>
            <dialog
                bind:this={dialog}
                on:click|self={backgroundClose}
                on:keydown|stopPropagation|preventDefault|capture={escapeClose}
            >
                <button class="qr" on:click={collapse}>
                    {@html $qrcode}
                </button>
            </dialog>
        {/if}

        <div class="button-group">
            {#if $qrcode}
                <button class="expand" on:click={toggleExpanded}>
                    <Icon name="expand" size="var(--space-m)" />
                    <div>
                        <span>Expand</span> <span>QR code</span>
                    </div>
                </button>
            {/if}
            <button class="copy" on:click={() => copyToClipboard(data)}>
                <div class="icon">
                    <div>
                        <Icon name="copy" size="var(--space-m)" />
                    </div>
                    {#if copied}
                        <div class="check" transition:fade={{duration: 180, easing: cubicInOut}}>
                            <Icon name="check" size="var(--space-m)" />
                        </div>
                    {/if}
                </div>
                <div>
                    <span>Copy</span> <span>to clipboard</span>
                </div>
            </button>
        </div>
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
        margin-bottom: var(--space-xs);
    }

    .qr {
        display: flex;
    }

    .qr :global(svg) {
        border-radius: var(--space-2xs);
        padding: var(--space-xs);
        background: white;
        flex: 1;
        width: 100%;
    }

    dialog {
        padding: 0;
        border-radius: var(--space-2xs);
        border: none;
    }

    dialog .qr {
        background-color: white;
        width: min(800px, 80vmin);
        border: none;
    }

    .button-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: center;
        gap: var(--space-s);
        position: absolute;
        top: 100%;
        width: 100%;
        transform: translateY(-50%);
    }

    .button-group button {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        border: none;
        cursor: pointer;
        background: var(--body-background-color);
        color: var(--body-text-color);
        font-size: var(--fs-0);
    }

    @media (max-width: 340px) {
        .button-group button span:last-of-type {
            display: none;
        }
    }

    .icon {
        display: grid;
        place-content: center;
        grid-template-areas: 'stack';
    }

    .icon > * {
        grid-area: stack;
    }

    .check {
        background: var(--body-background-color);
    }
</style>
