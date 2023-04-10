<script lang="ts">
    import {Meta, Template, Story} from '@storybook/addon-svelte-csf'
    import Qr from '../ui/components/Qr.svelte'
</script>

<Meta title="Components/Qr" component={Qr} />

<Story name="Default">
    <div style="display: flex; justify-content: center;">
        <Qr
            data={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, ipsam quia consequuntur magnam expedita laborum reprehenderit rerum accusantium quod, ullam fugit suscipit! Minus tempora similique voluptatum quibusdam porro, voluptatem aliquid delectus, magnam fugiat eligendi repellat omnis! Dolorem sint vero tempora harum quia eos nulla ipsam neque, enim architecto commodi expedita.'}
        />
    </div>
</Story>
