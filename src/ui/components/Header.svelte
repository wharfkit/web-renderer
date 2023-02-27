<script lang="ts">
    import {createEventDispatcher} from 'svelte'

    import {props} from '../state'

    const dispatch = createEventDispatcher<{
        cancel: void
    }>()
</script>

<div class="modal-header">
    <h2>{$props.title}</h2>
    <h4>{$props.subtitle}</h4>
    <svg
        class="close"
        on:click={() => dispatch('cancel')}
        width="46"
        height="46"
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="0.5" y="0.5" width="45" height="45" rx="11.5" stroke="#B2F2E1" />
        <path
            d="M16.2667 27.7799C15.918 28.1285 15.9014 28.751 16.275 29.1163C16.6402 29.4815 17.2628 29.4732 17.6114 29.1246L22.6915 24.0362L27.7799 29.1246C28.1368 29.4815 28.751 29.4815 29.1163 29.1163C29.4732 28.7427 29.4815 28.1368 29.1163 27.7799L24.0362 22.6915L29.1163 17.6114C29.4815 17.2545 29.4815 16.6402 29.1163 16.275C28.7427 15.918 28.1368 15.9097 27.7799 16.2667L22.6915 21.3551L17.6114 16.2667C17.2628 15.918 16.6319 15.9014 16.275 16.275C15.9097 16.6402 15.918 17.2628 16.2667 17.6114L21.3551 22.6915L16.2667 27.7799Z"
            fill="#252525"
        />
    </svg>
</div>

<style lang="scss">
    .modal-header {
        min-height: 80px;
        max-height: 110px;
        text-align: center;
        color: var(--button-text-color);
        background: var(--button-tertiary-color);
        svg.close {
            cursor: pointer;
            position: absolute;
            top: 0;
            right: 0;
            width: 46px;
            height: 46px;
            margin: 14px;
            cursor: pointer;
            fill: var(--button-text-color);
        }
        h2 {
            font-size: 20px;
            font-weight: 700;
            line-height: 24px;
            padding: 14px 0 7px;
            margin: 0;
        }
        h4 {
            font-size: 12px;
            line-height: 15px;
            margin: 0 0 14px;
        }
    }
</style>
