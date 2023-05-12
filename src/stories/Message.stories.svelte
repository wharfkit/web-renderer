<script>
    import {Meta, Story} from '@storybook/addon-svelte-csf'
    import Message from '../ui/components/Message.svelte'
    import ErrorMessage from '../ui/components/ErrorMessage.svelte'
    import WarningMessage from '../ui/components/WarningMessage.svelte'
</script>

<Meta title="Components/Message" component={Message} />

<Story name="Error">
    <ErrorMessage
        title="Error"
        details="Error: Test prompt timed out automatically after 5 seconds."
    />
</Story>

<Story name="Warning">
    <WarningMessage
        title="No accounts found"
        details="No accounts found matching PUB_K1_6RMS3nvoN9StPzZizve6WdovaDkE5KkEcCDXW7LbepyAhzQE4R"
    />
</Story>

<Story name="Signing">
    <Message title="Hold on for a moment..." icon="signal" />
</Story>
