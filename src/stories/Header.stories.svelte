<script>
    import {Meta, Story, Template} from '@storybook/addon-svelte-csf'

    import Header from '../ui/components/Header.svelte'
    import HeaderButton from '../ui/components/HeaderButton.svelte'
    import Icon from '../ui/components/Icon.svelte'
</script>

<Meta
    title="Components/Header"
    component={Header}
    argTypes={{title: {control: 'text'}, subtitle: {control: 'text'}}}
/>

<Template let:args>
    <Header {...args} />
</Template>

<Story name="Default" args={{title: 'Login', subtitle: 'Please login to continue'}} />

<Story name="With Logo">
    <Header title="Unicove">
        <Icon name="wharf" slot="left" />
    </Header>
</Story>

<Story name="With Back Button">
    <Header title="Login" subtitle="Please login to continue">
        <HeaderButton icon="chevron-left" slot="left" />
    </Header>
</Story>
