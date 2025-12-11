<script lang="ts">
    import {createEventDispatcher, getContext} from 'svelte'
    import type {i18nType} from '../../lib/translations'

    import Button from '../components/Button.svelte'
    import ButtonGroup from '../components/ButtonGroup.svelte'

    export let appName: string
    export let whitelist: Array<{contract: string; actions?: string[]}>

    const {t} = getContext<i18nType>('i18n')

    const dispatch = createEventDispatcher<{
        approve: void
        deny: void
    }>()

    const handleApprove = () => dispatch('approve')
    const handleDeny = () => dispatch('deny')

    function formatAction(contract: string, action?: string): string {
        if (action) {
            return `${action} (${contract})`
        }
        return `All actions (${contract})`
    }

    function getPermissionItems(entries: typeof whitelist): string[] {
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

    $: permissionItems = getPermissionItems(whitelist)
</script>

<div class="sk-header">
    <div class="sk-title">{appName}</div>
    <div class="sk-description">
        {$t('sessionkey.consent.wants-access', {default: 'wants permission to sign transactions without your wallet.'})}
    </div>
</div>

<div class="sk-body">
    <div class="sk-section-label">
        {$t('sessionkey.consent.this-will-allow', {default: 'Allow', appName})} <strong>{appName}</strong> {$t('sessionkey.consent.to', {default: 'to automatically:'})}
    </div>

    <ul class="sk-permissions-list">
        {#each permissionItems as item}
            <li class="sk-permission-item granted">
                <span class="sk-checkmark">&#10003;</span>
                <span>{item}</span>
            </li>
        {/each}
    </ul>

    <div class="sk-info-note">
        {$t('sessionkey.consent.revoke-note', {
            default: 'You can revoke this access at any time from this app, your wallet, or a block explorer.',
        })}
    </div>
</div>

<ButtonGroup>
    <Button
        data={{
            label: $t('sessionkey.consent.deny', {default: 'Decline'}),
            onClick: handleDeny,
            variant: 'secondary',
        }}
    />
    <Button
        data={{
            label: $t('sessionkey.consent.approve', {default: 'Authorize'}),
            onClick: handleApprove,
            variant: 'primary',
        }}
    />
</ButtonGroup>
