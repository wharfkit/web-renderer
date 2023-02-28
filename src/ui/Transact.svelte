<script lang="ts">
    import {createEventDispatcher, getContext} from 'svelte'

    import {i18nType} from 'src/lib/translations'

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

<p>{$t('transact.processing', {default: 'Doing transact stuffs - cool animation!'})}</p>
