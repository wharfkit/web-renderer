<script lang="ts">
    import {Meta, Story} from '@storybook/addon-svelte-csf'
    import ButtonGroup from '../ui/components/ButtonGroup.svelte'
    import Button from '../ui/components/Button.svelte'
</script>

<Meta title="Components/ButtonGroup" component={ButtonGroup} />

<Story name="Default">
    <div>
        <ButtonGroup>
            <Button data={{variant: 'outlined', label: 'Decline', icon: 'close'}} />
            <Button data={{variant: 'primary', label: 'Accept', icon: 'check'}} />
        </ButtonGroup>
    </div>
</Story>

<style>
    div {
        max-width: 400px;
        margin-inline: auto;
    }
</style>
