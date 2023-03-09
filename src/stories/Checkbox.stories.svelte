<script>
    import {Meta, Story} from '@storybook/addon-svelte-csf'
    import Checkbox from '../ui/components/Checkbox.svelte'

    let checked
</script>

<Meta title="Components/Checkbox" component={Checkbox} argTypes={{checked: {control: 'boolean'}}} />

<Story name="Default">
    <Checkbox />
</Story>
<Story name="In context">
    <div>
        <Checkbox />

        Auto approve this transaction
    </div>
</Story>

<style>
    div {
        padding: var(--space-l);
        background-color: var(--swell-mist);
        border-radius: var(--border-radius-inner);
        display: flex;
        align-items: center;
        gap: var(--space-s);
        color: var(--wharf-blue);
    }
</style>
