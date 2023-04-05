<script lang="ts">
    import {createEventDispatcher, getContext} from 'svelte'
    import {i18nType} from 'src/lib/translations'
    import Button from './Button.svelte'

    const {t} = getContext<i18nType>('i18n')

    const dispatch = createEventDispatcher<{
        complete: void
        cancel: void
    }>()
</script>

<Button
    data={{
        variant: 'primary',
        label: $t('accept', {default: 'Accept'}),
        onClick: () => dispatch('complete'),
    }}
/>

<Button
    data={{
        variant: 'secondary',
        label: $t('decline', {default: 'Decline'}),
        onClick: () => dispatch('cancel'),
    }}
/>
