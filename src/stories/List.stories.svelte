<script lang="ts">
    import {Meta, Template, Story} from '@storybook/addon-svelte-csf'
    import Blockchain from '../ui/login/Blockchain.svelte'
    import List from '../ui/components/List.svelte'
    import ListItem from '../ui/components/ListItem.svelte'

    const chains = [
        {name: 'Jungle 4 (Testnet)'},
        {name: 'EOS'},
        {name: 'Telos'},
        {name: 'Telos (Testnet)'},
        {name: 'UX'},
        {name: 'WAX'},
        {name: 'WAX (Testnet)'},
    ]
</script>

<Meta title="Components/List" component={List} />

<Template let:args />

<Story name="List Item">
    <ListItem leadingIcon="wharf" label={chains[0].name} onClick={() => {}} />
</Story>

<Story name="List Item No Icon">
    <ListItem label={chains[0].name} onClick={() => {}} />
</Story>

<Story name="Full List">
    <List>
        {#each chains as chain}
            <ListItem leadingIcon="wharf" label={chain.name} onClick={() => {}} />
        {/each}
    </List>
</Story>

<Story name="Full List No Icon">
    <List>
        {#each chains as chain}
            <ListItem label={chain.name} onClick={() => {}} />
        {/each}
    </List>
</Story>
