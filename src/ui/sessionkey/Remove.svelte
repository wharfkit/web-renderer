<script lang="ts">
    import {createEventDispatcher, getContext} from 'svelte'
    import type {i18nType} from '../../lib/translations'

    import Button from '../components/Button.svelte'
    import ButtonGroup from '../components/ButtonGroup.svelte'

    export let appName: string

    const {t} = getContext<i18nType>('i18n')

    const dispatch = createEventDispatcher<{
        confirm: void
        cancel: void
    }>()

    const handleConfirm = () => dispatch('confirm')
    const handleCancel = () => dispatch('cancel')
</script>

<div class="sk-header">
    <div class="sk-title">
        {$t('sessionkey.remove.title', {default: 'Also remove session key?'})}
    </div>
    <div class="sk-description">
        {$t('sessionkey.remove.description', {default: 'You have a session key that allows'})} <strong>{appName}</strong> {$t('sessionkey.remove.description-2', {default: 'to sign transactions automatically.'})}
    </div>
</div>

<div class="sk-body">
    <div class="sk-info-note">
        {$t('sessionkey.remove.note', {
            default: 'Your wallet will ask you to sign a transaction to remove this permission.',
        })}
    </div>
</div>

<ButtonGroup>
    <Button
        data={{
            label: $t('sessionkey.remove.force', {default: 'Force Logout'}),
            onClick: handleCancel,
            variant: 'secondary',
        }}
    />
    <Button
        data={{
            label: $t('sessionkey.remove.remove', {default: 'Remove'}),
            onClick: handleConfirm,
            variant: 'primary',
        }}
    />
</ButtonGroup>
