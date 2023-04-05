<script>
    import {Meta, Story} from '@storybook/addon-svelte-csf'
    import TextInput from '../ui/components/TextInput.svelte'
</script>

<Meta title="Components/TextInput" component={TextInput} />

<Story name="Empty">
    <TextInput value="" onKeyup={() => {}} placeholder="Account name" />
</Story>

<Story name="Filled">
    <TextInput value={'teamgreymass'} onKeyup={() => {}} placeholder="Account name" autofocus />
</Story>

<Story name="Error">
    <TextInput value={'santa.gm'} onKeyup={() => {}} placeholder="Account name" error />
</Story>
