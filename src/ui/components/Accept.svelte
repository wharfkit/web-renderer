<script lang="ts">
    import {createEventDispatcher, getContext} from 'svelte'
    import type {i18nType} from 'src/lib/translations'
    import Button from './Button.svelte'
    import ButtonGroup from './ButtonGroup.svelte'

    const {t} = getContext<i18nType>('i18n')

    const dispatch = createEventDispatcher<{
        complete: void
        cancel: void
    }>()
</script>

<ButtonGroup>
    <Button
        data={{
            variant: 'outlined',
            label: $t('decline', {default: 'Decline'}),
            onClick: () => dispatch('cancel'),
            icon: 'close',
        }}
    />

    <Button
        data={{
            variant: 'primary',
            label: $t('accept', {default: 'Accept'}),
            onClick: () => dispatch('complete'),
            icon: 'check',
        }}
    />
</ButtonGroup>
