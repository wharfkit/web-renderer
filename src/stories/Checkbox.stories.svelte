<script>
    import {Meta, Story} from '@storybook/addon-svelte-csf'
    import Checkbox from '../ui/components/Checkbox.svelte'

    let checked
</script>

<Meta title="Components/Checkbox" component={Checkbox} argTypes={{checked: {control: 'boolean'}}} />

<Story name="Default">
    <Checkbox />
</Story>

<Story name="Checked">
    <Checkbox args={{checked: true}} />
</Story>
