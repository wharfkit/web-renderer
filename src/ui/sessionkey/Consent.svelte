<script lang="ts">
    import {createEventDispatcher, getContext} from 'svelte'
    import type {i18nType} from '../../lib/translations'

    import Button from '../components/Button.svelte'
    import ButtonGroup from '../components/ButtonGroup.svelte'
    import Icon from '../components/Icon.svelte'

    export let appName: string
    export let whitelist: Array<{contract: string; actions?: string[]}>

    const {t} = getContext<i18nType>('i18n')

    const dispatch = createEventDispatcher<{
        approve: void
        deny: void
    }>()

    const handleApprove = () => dispatch('approve')
    const handleDeny = () => dispatch('deny')

    interface PermissionGroup {
        contract: string
        actions: string[]
        isAllActions: boolean
    }

    function getPermissionGroups(entries: typeof whitelist): PermissionGroup[] {
        return entries.map((entry) => ({
            contract: entry.contract,
            actions: entry.actions && entry.actions.length > 0 ? entry.actions : [],
            isAllActions: !entry.actions || entry.actions.length === 0,
        }))
    }

    $: groups = getPermissionGroups(whitelist)
    $: permissionCount = groups.reduce(
        (sum, g) => sum + (g.isAllActions ? 1 : g.actions.length),
        0
    )
    $: contractCount = groups.length
    $: hasAllActions = groups.some((g) => g.isAllActions)
    $: shouldAutoExpand = hasAllActions || permissionCount > 8 || contractCount > 2
    $: useGrouping = permissionCount > 3

    let showDetails = false

    $: if (shouldAutoExpand) {
        showDetails = true
    }

    function toggleDetails() {
        showDetails = !showDetails
    }
</script>

<div class="sk-header">
    <div class="sk-title">{appName}</div>
    <div class="sk-description">
        {$t('sessionkey.consent.description', {
            default: "wants to perform actions on your behalf, so you won't need wallet approval each time.",
        })}
    </div>
</div>

<div class="sk-body">
    <div class="sk-summary-badge">
        <span class="sk-summary-left">
            <Icon name="info" size="16px" />
            <span>
                {$t('sessionkey.consent.summary', {
                    default: `${permissionCount} permission${permissionCount !== 1 ? 's' : ''} on ${contractCount} contract${contractCount !== 1 ? 's' : ''}`,
                    count: permissionCount,
                    contracts: contractCount,
                })}
            </span>
        </span>
        <button class="sk-toggle-btn" on:click={toggleDetails}>
            {showDetails
                ? $t('sessionkey.consent.hide-details', {default: 'Hide details'})
                : $t('sessionkey.consent.view-details', {default: 'View details'})}
        </button>
    </div>

    {#if showDetails}
        <div class="sk-section-label">
            {$t('sessionkey.consent.section-label', {default: `If approved, ${appName} can perform these actions without wallet approval:`, appName})}
        </div>

        {#if useGrouping}
            {#each groups as group}
                <div class="sk-contract-group">
                    <div class="sk-contract-header">{group.contract}</div>
                    {#if group.isAllActions}
                        <ul class="sk-permissions-list">
                            <li class="sk-permission-item warning">
                                <span class="sk-warning-icon">
                                    <Icon name="alert" size="16px" color="#f59e0b" />
                                </span>
                                <span>
                                    {$t('sessionkey.consent.all-actions', {
                                        default: 'Full access - includes future actions',
                                        contract: group.contract,
                                    })}
                                </span>
                            </li>
                        </ul>
                    {:else}
                        <ul class="sk-permissions-list">
                            {#each group.actions as action}
                                <li class="sk-permission-item neutral">
                                    <span class="sk-bullet">-</span>
                                    <span>{action}</span>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            {/each}
        {:else}
            <ul class="sk-permissions-list">
                {#each groups as group}
                    {#if group.isAllActions}
                        <li class="sk-permission-item warning">
                            <span class="sk-warning-icon">
                                <Icon name="alert" size="16px" color="#f59e0b" />
                            </span>
                            <span>
                                {$t('sessionkey.consent.all-actions-with-contract', {
                                    default: `Full access to ${group.contract} - includes future actions`,
                                    contract: group.contract,
                                })}
                            </span>
                        </li>
                    {:else}
                        {#each group.actions as action}
                            <li class="sk-permission-item neutral">
                                <span class="sk-bullet">-</span>
                                <span>{action} <span class="contract-hint">({group.contract})</span></span>
                            </li>
                        {/each}
                    {/if}
                {/each}
            </ul>
        {/if}

        <div class="sk-boundary">
            {$t('sessionkey.consent.boundary', {
                default: 'Any other action will still require wallet approval.',
            })}
        </div>
    {/if}

    <div class="sk-info-note">
        {$t('sessionkey.consent.decline-explanation', {
            default: `This is optional. ${appName} works without it - you'll just approve each action individually.`,
            appName,
        })}
    </div>
</div>

<ButtonGroup>
    <Button
        data={{
            label: $t('sessionkey.consent.deny', {default: 'Not Now'}),
            onClick: handleDeny,
            variant: 'secondary',
        }}
    />
    <Button
        data={{
            label: $t('sessionkey.consent.approve', {default: 'Allow'}),
            onClick: handleApprove,
            variant: 'primary',
        }}
    />
</ButtonGroup>

<style>
    .contract-hint {
        color: var(--body-text-color-variant, #888);
        font-size: 0.85em;
    }
</style>
