<script lang="ts">
    import {createEventDispatcher, getContext} from 'svelte'

    import {i18nType} from 'src/lib/translations'

    const {t} = getContext<i18nType>('i18n')
    const dispatch = createEventDispatcher<{
        complete: void
    }>()
</script>

<button on:click={() => dispatch('complete')}>
    {$t('close', {default: 'Close'})}
</button>

<style lang="scss">
    button {
        cursor: pointer;
        display: block;
        width: 300px;
        height: 65px;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        color: var(--button-text-color);
        background-color: var(--button-tertiary-color);
        border: none;
        box-shadow: none;
        margin: 27px auto 0;
    }
</style>
