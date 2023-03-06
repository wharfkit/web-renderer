<script lang="ts">
    import {Meta, Template, Story} from '@storybook/addon-svelte-csf'
    import Blockchain from '../ui/login/Blockchain.svelte'
</script>

<Meta title="Components/List" component={Blockchain} />

<Template let:args />

<Story name="Blockchains">
    <Blockchain
        chains={[
            {name: 'Jungle 4 (Testnet)'},
            {name: 'EOS'},
            {name: 'Telos'},
            {name: 'Telos (Testnet)'},
            {name: 'UX'},
            {name: 'WAX'},
            {name: 'WAX (Testnet)'},
        ]}
    />
</Story>
