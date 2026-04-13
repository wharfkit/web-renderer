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
        {appName}
    </div>
    <div class="sk-description">
        {$t('sessionkey.conflict.description', {
            default: `already has permissions on`,
        })} <strong>{deviceText}</strong>.
    </div>
</div>

<div class="sk-body">
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

    <div class="sk-info-note">
        {$t('sessionkey.conflict.note', {
            default: `This only affects ${appName}. Your wallet still works everywhere.`,
            appName,
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
        border: 1px solid rgba(var(--body-text-color-rgb, 51, 51, 51), 0.15);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    label.selected {
        border-color: var(--button-primary-background, #1cb095);
        background: rgba(28, 176, 149, 0.06);
    }

    label.selected .option-title {
        color: var(--body-text-color, #333);
    }

    label:not(.selected):hover {
        border-color: rgba(var(--body-text-color-rgb, 51, 51, 51), 0.4);
        background: rgba(var(--body-text-color-rgb, 51, 51, 51), 0.07);
    }

    label:not(.selected):hover .option-title {
        color: var(--body-text-color, #333);
    }

    label.selected:hover {
        background: rgba(28, 176, 149, 0.09);
    }

    input[type='radio'] {
        margin-top: 0.25em;
        accent-color: var(--button-primary-background, #1cb095);
    }

    .option-content {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .option-title {
        font-weight: 500;
        font-size: 0.95em;
        color: var(--body-text-color-variant, #888);
    }

    .option-subtitle {
        font-size: 0.85em;
        color: var(--body-text-color-variant, #888);
    }
</style>
