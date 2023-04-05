<script lang="ts">
    import {i18nType} from 'src/lib/translations'
    import {getContext} from 'svelte'
    import ErrorMessage from './components/ErrorMessage.svelte'
    import {errorDetails} from './state'

    const {t} = getContext<i18nType>('i18n')
</script>

<div class="error">
    {#if $errorDetails}
        <ErrorMessage title={$t('error.title', {default: 'Error'})} details={$errorDetails} />
    {/if}
</div>
