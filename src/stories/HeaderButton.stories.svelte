<script>
    import {Meta, Story} from '@storybook/addon-svelte-csf'

    import HeaderButton from '../ui/components/HeaderButton.svelte'
</script>

<Meta title="Components/HeaderButton" component={HeaderButton} />

<Story name="Close">
    <HeaderButton icon="close" onClick={() => {}} />
</Story>

<Story name="Filecode">
    <HeaderButton icon="filecode" onClick={() => {}} />
</Story>
