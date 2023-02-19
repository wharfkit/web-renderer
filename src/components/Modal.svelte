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
        complete: (e: any) => any
        cancel: (e: any) => any
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
        }
    }

    function escapeClose(event) {
        if (event.key === 'Escape') {
            dialog.close()
        }
    }
</script>

<dialog
    bind:this={dialog}
    on:click|capture|nonpassive={backgroundClose}
    on:keyup|preventDefault|capture|nonpassive={escapeClose}
>
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
</dialog>

<style lang="scss">
    :host {
        --ratio: 3.74;
        --cta-color: rgb(0, 102, 254);
        --light-color-bg: rgb(238, 241, 247);
        --dark-color-bg: rgb(55, 65, 81);
        --grey-color: rgb(107, 114, 128);
        --leading: 0.025em;
    }
    dialog {
        border: none !important;
        border-radius: calc(5px * var(--ratio));
        box-shadow: 0 0 #0000, 0 0 #0000, 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        padding: 1.6rem;
        max-width: 400px;
    }
    button {
        display: block;
        margin-top: 2rem;
        width: calc(44px * var(--ratio));
        height: 44px;
        border-radius: calc(3px * var(--ratio));
        border: none;
        letter-spacing: calc(3 * var(--leading, 0.025em));
        font-family: inherit;
        color: var(--grey-color);
        background-color: var(--light-color-bg);
        font-size: large;
        font-weight: 700;
        :focus {
            outline: none;
            border: 0.0625rem solid transparent;
            box-shadow: 0 0 0 0.125rem #fff, 0 0 0 0.2rem var(--dark-color-bg);
        }
        .cta {
            background-color: var(--cta-color);
            color: white;
            :focus {
                box-shadow: 0 0 0 0.125rem #fff, 0 0 0 0.2rem var(--cta-color);
            }
        }
    }
</style>
