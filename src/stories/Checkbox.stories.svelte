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
        color: var(--wharf-blue);
        border-radius: var(--border-radius-inner);
        display: flex;
        align-items: center;
        gap: var(--space-s);
    }

    @media (prefers-color-scheme: dark) {
        div {
            background-color: #494e62;
            color: white;
        }
    }
</style>
