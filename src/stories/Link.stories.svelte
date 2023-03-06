<script>
    import {Meta, Story} from '@storybook/addon-svelte-csf'

    import Link from '../ui/components/Link.svelte'
</script>

<Meta title="Components/Link" component={Link} />

<Story name="Link Button">
    <Link data={{href: '', label: 'Button', button: true}} />
</Story>

<Story name="Link Button w/ Icon">
    <Link data={{href: '', label: 'Decline', button: true, icon: 'close'}} />
</Story>

<Story name="Default Link">
    <Link data={{href: '#', label: 'Link'}} />
</Story>
