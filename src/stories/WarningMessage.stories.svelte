<script>
    import {Meta, Story} from '@storybook/addon-svelte-csf'
    import WarningMessage from '../ui/components/WarningMessage.svelte'
</script>

<Meta title="Components/Warning" component={WarningMessage} />

<Story name="Default">
    <WarningMessage
        title="No accounts found"
        details="No accounts found matching PUB_K1_6RMS3nvoN9StPzZizve6WdovaDkE5KkEcCDXW7LbepyAhzQE4R"
    />
</Story>
