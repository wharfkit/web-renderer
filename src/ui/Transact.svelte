<script lang="ts">
    import {createEventDispatcher, getContext} from 'svelte'

    import {i18nType} from 'src/lib/translations'
    import Countdown from './components/Countdown.svelte'

    const {t} = getContext<i18nType>('i18n')

    const dispatch = createEventDispatcher<{
        complete: void
        cancel: void
    }>()

    const complete = () => {
        dispatch('complete')
    }

    const cancel = () => {
        dispatch('cancel')
    }
</script>

<Countdown
    data={{
        label: $t('transact.processing', {default: 'Performing transaction...'}),
    }}
/>
