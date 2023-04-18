<script lang="ts">
    import {Meta, Story} from '@storybook/addon-svelte-csf'
    import Asset from '../ui/components/Asset.svelte'
</script>

<Meta title="Components/Asset" component={Asset} />

<Story name="Default">
    <Asset data={{label: 'cost of CPU/NET', value: '0.03 EOS'}} />
</Story>

<style>
</style>
