<script>
    import {Meta, Story} from '@storybook/addon-svelte-csf'

    import Header from '../ui/components/Header.svelte'
    import Icon from '../ui/components/Icon.svelte'
</script>

<Meta title="Components/Header" component={Header} />

<Story name="Default">
    <Header title="Login" subtitle="Please login to continue" />
</Story>

<Story name="With Logo">
    <Header title="Unicove">
        <Icon name="wharf" slot="left" />
    </Header>
</Story>
