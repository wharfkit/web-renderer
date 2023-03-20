<script lang="ts">
    import {Meta, Template, Story} from '@storybook/addon-svelte-csf'
    import Button from '../ui/components/Button.svelte'
</script>

<Meta
    title="Components/Button"
    component={Button}
    argTypes={{
        variant: {control: 'select', options: ['primary', 'secondary', 'outlined']},
        icon: {control: 'dropdown'},
        onClick: {action: 'clicked'},
        label: {control: 'text'},
    }}
/>

<Template let:args>
    <div style="display: flex;">
        <Button {...args} />
    </div>
</Template>

<Story name="Primary" args={{data: {variant: 'primary', label: 'Private Key Signer'}}} />

<Story name="Primary w/ Icon" args={{data: {variant: 'primary', label: 'Accept', icon: 'check'}}} />

<Story name="Secondary" args={{data: {variant: 'secondary', label: 'Decline', icon: 'close'}}} />

<Story name="Outlined" args={{data: {variant: 'outlined', label: 'Login', icon: 'login'}}} />
