<script>
    import {Meta, Story} from '@storybook/addon-svelte-csf'

    import Link from '../ui/components/Link.svelte'
</script>

<Meta title="Components/Link" component={Link} />

<Story name="Button">
    <Link data={{href: '', label: 'Button', button: true}} />
</Story>

<Story name="Default">
    <Link data={{href: '#', label: 'Button'}} />
</Story>
