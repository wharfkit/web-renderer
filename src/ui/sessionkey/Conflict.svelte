<script lang="ts">
    import {createEventDispatcher, getContext} from 'svelte'
    import type {i18nType} from '../../lib/translations'

    import Button from '../components/Button.svelte'
    import ButtonGroup from '../components/ButtonGroup.svelte'

    export let appName: string
    export let existingKeyCount: number

    const {t} = getContext<i18nType>('i18n')

    const dispatch = createEventDispatcher<{
        select: 'add' | 'replace' | 'cancel'
    }>()

    let choice: 'add' | 'replace' = 'add'

    const handleContinue = () => dispatch('select', choice)
    const handleCancel = () => dispatch('select', 'cancel')

    $: deviceText = existingKeyCount === 1 ? 'another device' : `${existingKeyCount} other devices`
</script>

<div class="sk-header">
    <div class="sk-title">
        {$t('sessionkey.conflict.title', {default: 'Session key already exists'})}
    </div>
    <div class="sk-description">
        {$t('sessionkey.conflict.description', {
            default: `You have authorized`,
        })} <strong>{deviceText}</strong> {$t('sessionkey.conflict.description-2', {
            default: `to sign transactions for`,
        })} <strong>{appName}</strong>.
    </div>
</div>

<div class="sk-body">
    <div class="sk-section-label">
        {$t('sessionkey.conflict.question', {default: 'How would you like to proceed?'})}
    </div>

    <div class="options">
        <label class:selected={choice === 'add'}>
            <input type="radio" bind:group={choice} value="add" />
            <div class="option-content">
                <span class="option-title">
                    {$t('sessionkey.conflict.add', {default: 'Add this device'})}
                </span>
                <span class="option-subtitle">
                    {$t('sessionkey.conflict.add-description', {
                        default: 'All devices will continue to work',
                    })}
                </span>
            </div>
        </label>
        <label class:selected={choice === 'replace'}>
            <input type="radio" bind:group={choice} value="replace" />
            <div class="option-content">
                <span class="option-title">
                    {$t('sessionkey.conflict.replace', {default: 'Only use this device'})}
                </span>
                <span class="option-subtitle">
                    {$t('sessionkey.conflict.replace-description', {
                        default: 'Other devices will stop working',
                    })}
                </span>
            </div>
        </label>
    </div>

    <div class="sk-info-note primary">
        {$t('sessionkey.conflict.note', {
            default: 'Session keys are for this app only. Your primary wallet will continue to work on all devices.',
        })}
    </div>
    <div class="sk-info-note secondary">
        {$t('sessionkey.conflict.note-sign', {
            default: 'Your wallet will ask you to sign a transaction to update your permissions.',
        })}
    </div>
</div>

<ButtonGroup>
    <Button
        data={{
            label: $t('sessionkey.conflict.cancel', {default: 'Cancel'}),
            onClick: handleCancel,
            variant: 'secondary',
        }}
    />
    <Button
        data={{
            label: $t('sessionkey.conflict.continue', {default: 'Continue'}),
            onClick: handleContinue,
            variant: 'primary',
        }}
    />
</ButtonGroup>

<style>
    @import '../../styles/sessionkey.css';

    .options {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 16px;
    }

    label {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 14px;
        background: transparent;
        border: 2px solid var(--borderColor-default, #d1d5da);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    label.selected {
        border-color: var(--body-text-color);
        background: rgba(var(--body-text-color-rgb, 51, 51, 51), 0.05);
    }

    label:hover {
        border-color: var(--body-text-color-variant);
        background: rgba(var(--body-text-color-rgb, 51, 51, 51), 0.03);
    }

    input[type='radio'] {
        margin-top: 0.25em;
        accent-color: var(--body-text-color);
    }

    .option-content {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .option-title {
        font-weight: 500;
        font-size: 0.95em;
        color: var(--body-text-color);
    }

    .option-subtitle {
        font-size: 0.85em;
        color: var(--body-text-color-variant);
    }
</style>
