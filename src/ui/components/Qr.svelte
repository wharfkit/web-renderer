<script lang="ts">
    import generateQr from '../../lib/qrcode'
    import Icon from './Icon.svelte'
    export let data = ''
    let expanded = false

    const toggleExpanded = () => {
        expanded = !expanded
    }

    const collapse = () => {
        expanded = false
    }

    const expandedStyles = 'scale: 2; transform-origin: center;'
</script>

{#if data}
    <div>
        <span style={expanded ? expandedStyles : ''} on:click={collapse} on:keydown={collapse}>
            {@html generateQr(data)}
        </span>
        <button on:click={toggleExpanded}>
            <span class="visually-hidden">Expand</span>
            <Icon name="expand" size="--space-s" />
        </button>
    </div>
{/if}

<style>
    div {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--body-background-color);
        border-radius: var(--space-s);
        padding: var(--space-s);
        border: 2px solid var(--qr-border-color);
    }

    span {
        background: white;
        padding: var(--space-xs);
        padding-bottom: var(--space-2xs);
        border-radius: var(--space-2xs);
        transition: scale 200ms ease;
        z-index: 2;
    }

    button {
        position: absolute;
        bottom: calc(var(--space-m) * -1);
        border: none;
        background: var(--body-background-color);
        padding: var(--space-s);
        cursor: pointer;
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
