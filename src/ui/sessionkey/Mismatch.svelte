<script lang="ts">
    import {createEventDispatcher, getContext} from 'svelte'
    import type {i18nType} from '../../lib/translations'

    import Button from '../components/Button.svelte'
    import ButtonGroup from '../components/ButtonGroup.svelte'

    export let appName: string
    export let added: Array<{contract: string; actions?: string[]}>
    export let removed: Array<{contract: string; actions?: string[]}>

    const {t} = getContext<i18nType>('i18n')

    const dispatch = createEventDispatcher<{
        select: 'update' | 'dismiss'
    }>()

    const handleUpdate = () => dispatch('select', 'update')
    const handleDismiss = () => dispatch('select', 'dismiss')

    function formatAction(contract: string, action?: string): string {
        if (action) {
            return `${action} (${contract})`
        }
        return `All actions (${contract})`
    }

    function getPermissionItems(entries: typeof added | typeof removed): string[] {
        const items: string[] = []
        for (const entry of entries) {
            if (entry.actions && entry.actions.length > 0) {
                for (const action of entry.actions) {
                    items.push(formatAction(entry.contract, action))
                }
            } else {
                items.push(formatAction(entry.contract))
            }
        }
        return items
    }

    $: addedItems = getPermissionItems(added)
    $: removedItems = getPermissionItems(removed)
</script>

<div class="sk-header">
    <div class="sk-title">{appName}</div>
    <div class="sk-description">
        {$t('sessionkey.mismatch.wants-updated-access', {
            default: 'is requesting changes to your session key permissions.',
        })}
    </div>
</div>

<div class="sk-body">
    {#if added.length > 0}
        <div class="sk-section-label">
            {$t('sessionkey.mismatch.new-permissions', {default: 'New permissions:'})}
        </div>

        <ul class="sk-permissions-list">
            {#each addedItems as item}
                <li class="sk-permission-item added">
                    <span class="sk-indicator">+</span>
                    <span>{item}</span>
                </li>
            {/each}
        </ul>
    {/if}

    {#if removed.length > 0}
        <div class="sk-section-label">
            {$t('sessionkey.mismatch.removed-permissions', {
                default: 'Permissions no longer needed:',
            })}
        </div>

        <ul class="sk-permissions-list">
            {#each removedItems as item}
                <li class="sk-permission-item removed">
                    <span class="sk-indicator">−</span>
                    <span>{item}</span>
                </li>
            {/each}
        </ul>
    {/if}

    <div class="sk-info-note">
        {$t('sessionkey.mismatch.revoke-note', {
            default: 'You can revoke this access at any time from this app, your wallet, or a block explorer.',
        })}
    </div>
</div>

<ButtonGroup>
    <Button
        data={{
            label: $t('sessionkey.mismatch.later', {default: 'Later'}),
            onClick: handleDismiss,
            variant: 'secondary',
        }}
    />
    <Button
        data={{
            label: $t('sessionkey.mismatch.update', {default: 'Update Permissions'}),
            onClick: handleUpdate,
            variant: 'primary',
        }}
    />
</ButtonGroup>

<style>
    @import '../../styles/sessionkey.css';
</style>
