<script lang="ts">
    import {onMount} from 'svelte'

    type TextareaProps = {
        content?: string
    }

    export let data: TextareaProps = {}

    let wrapper
    let textarea
    let maxOpacity = 0.2

    function handleScroll(event) {
        let scrollMax = event.target.scrollHeight - event.target.clientHeight
        let currentScroll = event.target.scrollTop / scrollMax
        let topShadowOpacity = currentScroll * maxOpacity
        let bottomShadowOpacity = (1 - currentScroll) * maxOpacity
        wrapper.style.setProperty('--top-shadow-opacity', topShadowOpacity)
        wrapper.style.setProperty('--bottom-shadow-opacity', bottomShadowOpacity)
    }

    onMount(() => {
        let startingOpacity =
            (1 - textarea.scrollTop / (textarea.scrollHeight - textarea.clientHeight)) * maxOpacity
        wrapper.style.setProperty('--bottom-shadow-opacity', startingOpacity)
    })
</script>

<div class="wrapper" bind:this={wrapper}>
    <textarea bind:this={textarea} on:scroll={handleScroll} readOnly>{data.content}</textarea>
</div>

<style lang="scss">
    .wrapper {
        position: relative;
        display: flex;
        display: grid;
        background-color: var(--text-area-background);

        // padding: var(--space-m);
        border-radius: var(--border-radius-inner);
        overflow: hidden;
    }
    textarea {
        --rows: 9;
        flex: 1;
        color: var(--text-area-text-color);
        background-color: var(--text-area-background);
        border: none;
        font-size: var(--fs-0);
        font-weight: 400;
        line-height: 1.5;
        resize: none;
        opacity: 0.75;
        height: calc(var(--fs-0) * 1.5 * var(--rows) - var(--fs-0) * 1.5 * 0.5);
        border-radius: inherit;
        // width: 100%;
        padding-inline-start: var(--space-m);
        padding-block-start: var(--space-m);
    }

    .wrapper::before,
    .wrapper::after {
        content: '';
        display: block;
        position: absolute;
        z-index: 2;
        width: 100%;
        height: var(--space-l);
        background: linear-gradient(var(--deg), transparent, black 100%);
    }
    .wrapper::before {
        --deg: 0;
        top: 0;
        opacity: var(--top-shadow-opacity, 0);
    }
    .wrapper::after {
        --deg: 180deg;
        bottom: 0;
        opacity: var(--bottom-shadow-opacity, 0);
    }
</style>
