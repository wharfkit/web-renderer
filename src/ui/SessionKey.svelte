<script lang="ts">
    import {createEventDispatcher, getContext} from 'svelte'
    import type {i18nType} from '../lib/translations'

    import Consent from './sessionkey/Consent.svelte'
    import Conflict from './sessionkey/Conflict.svelte'
    import Mismatch from './sessionkey/Mismatch.svelte'
    import Remove from './sessionkey/Remove.svelte'

    import {
        sessionKeyConsentData,
        sessionKeyConsentPromise,
        sessionKeyConflictData,
        sessionKeyConflictPromise,
        sessionKeyMismatchData,
        sessionKeyMismatchPromise,
        sessionKeyRemoveData,
        sessionKeyRemovePromise,
        router,
    } from './state'

    const {t} = getContext<i18nType>('i18n')

    const dispatch = createEventDispatcher<{
        cancel: void
        complete: void
    }>()

    function handleConsentApprove() {
        if ($sessionKeyConsentPromise) {
            $sessionKeyConsentPromise.resolve(true)
        }
        dispatch('complete')
    }

    function handleConsentDeny() {
        if ($sessionKeyConsentPromise) {
            $sessionKeyConsentPromise.resolve(false)
        }
        dispatch('cancel')
    }

    function handleConflictSelect(event: CustomEvent<'add' | 'replace' | 'cancel'>) {
        if ($sessionKeyConflictPromise) {
            $sessionKeyConflictPromise.resolve(event.detail)
        }
        if (event.detail === 'cancel') {
            dispatch('cancel')
        } else {
            dispatch('complete')
        }
    }

    function handleMismatchSelect(event: CustomEvent<'update' | 'dismiss'>) {
        if ($sessionKeyMismatchPromise) {
            $sessionKeyMismatchPromise.resolve(event.detail)
        }
        dispatch('complete')
    }

    function handleRemoveConfirm() {
        if ($sessionKeyRemovePromise) {
            $sessionKeyRemovePromise.resolve(true)
        }
    }

    function handleRemoveCancel() {
        if ($sessionKeyRemovePromise) {
            $sessionKeyRemovePromise.resolve(false)
        }
    }
</script>

{#if $router.path === 'sessionkey-consent' && $sessionKeyConsentData}
    <Consent
        appName={$sessionKeyConsentData.appName}
        whitelist={$sessionKeyConsentData.whitelist}
        on:approve={handleConsentApprove}
        on:deny={handleConsentDeny}
    />
{:else if $router.path === 'sessionkey-conflict' && $sessionKeyConflictData}
    <Conflict
        appName={$sessionKeyConflictData.appName}
        existingKeyCount={$sessionKeyConflictData.existingKeyCount}
        on:select={handleConflictSelect}
    />
{:else if $router.path === 'sessionkey-mismatch' && $sessionKeyMismatchData}
    <Mismatch
        appName={$sessionKeyMismatchData.appName}
        added={$sessionKeyMismatchData.added}
        removed={$sessionKeyMismatchData.removed}
        on:select={handleMismatchSelect}
    />
{:else if $router.path === 'sessionkey-remove' && $sessionKeyRemoveData}
    <Remove
        appName={$sessionKeyRemoveData.appName}
        on:confirm={handleRemoveConfirm}
        on:cancel={handleRemoveCancel}
    />
{:else}
    <p>{$t('loading', {default: 'Loading...'})}</p>
{/if}
