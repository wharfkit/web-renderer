<script lang="ts">
    import {active, message, hideModal} from './Modal'
</script>

<svelte:window on:keydown={$active ? hideModal : () => {}} />

<div class="modal" class:active={$active}>
    <div class="modal-content">{$message}</div>
    <button on:keydown|preventDefault={hideModal} on:click={hideModal}>Close</button>
</div>

<style>
    .modal {
        display: none;

        background: white;
        padding: 20px;

        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 300px;
        max-width: 300px;

        overflow: hidden;

        z-index: 2000;
    }
    .modal.active {
        display: block;
    }
</style>
