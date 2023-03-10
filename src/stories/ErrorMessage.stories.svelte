<script>
    import {Meta, Story} from '@storybook/addon-svelte-csf'
    import ErrorMessage from '../ui/components/ErrorMessage.svelte'
</script>

<Meta title="Components/Error" component={ErrorMessage} />

<Story name="Default">
    <ErrorMessage
        title="Error"
        details="Error: Test prompt timed out automatically after 5 seconds."
    />
</Story>
