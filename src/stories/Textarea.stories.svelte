<script>
    import {Meta, Story} from '@storybook/addon-svelte-csf'
    import Textarea from '../ui/components/Textarea.svelte'
</script>

<Meta
    title="Components/Textarea"
    component={Textarea}
    argTypes={{data: {content: {control: 'text'}}}}
/>

<Story name="Default">
    <Textarea
        data={{
            content: `cleos -u https://jungle4.greymass.com
push transaction ‘{
    "expiration":
"2023-03-08T05:41:04",
    "ref block num": 25314,
    "ref block prefix": 3790176948,
    "max net usage words":
0,
    "max cpu_usage ms": 0,

    "delay sec":
0,
    "context free actions": [],`,
        }}
    />
</Story>
