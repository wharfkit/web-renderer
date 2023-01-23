<script lang="ts">
    import {dimmer} from './Dimmer'
    import {hideModal} from './Modal'
</script>

<div on:keydown={hideModal} on:click={hideModal} class="dimmer" class:active={$dimmer === true} />

<style>
    .dimmer {
        display: none;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto; /* Enable scroll if needed */
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 1001;
    }
    .dimmer.active {
        display: block;
    }
</style>
