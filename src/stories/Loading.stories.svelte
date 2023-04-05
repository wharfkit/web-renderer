<script>
    import {Meta, Story, Template} from '@storybook/addon-svelte-csf'
    import Loading from '../ui/components/Loading.svelte'
</script>

<Meta
    title="Components/Loading"
    component={Loading}
    argTypes={{
        loading: {control: 'boolean'},
    }}
/>

<Template let:args>
    <Loading {...args} />
</Template>

<Story name="True" args={{loading: true}} />

<Story name="False" args={{loading: false}} />
