<script>
    import {Meta, Story} from '@storybook/addon-svelte-csf'

    import Button from '../ui/components/Button.svelte'
</script>

<Meta title="Components/Button" component={Button} />

<Story name="Primary">
    <Button>Private Key Signer</Button>
</Story>

<Story name="Primary w/ Icon">
    <Button icon="close">Decline</Button>
</Story>

<Story name="Secondary">
    <Button variant="secondary">Private Key Signer</Button>
</Story>

<Story name="Outlined">
    <Button variant="outlined">Private Key Signer</Button>
</Story>
