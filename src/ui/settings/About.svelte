<script>
    import BodyText from '../components/BodyText.svelte'
    import BodyTitle from '../components/BodyTitle.svelte'
    import Button from '../components/Button.svelte'
</script>

<div>
    <!-- <img src="https://greymass.com/greymass.png" alt="Greymass" class="w-32 h-32 mx-auto" /> -->
    <BodyTitle>Version 1.39.5</BodyTitle>
    <BodyText>
        Built by Greymass, Licenses, Thanks, Shipping great code starts with a solid platform. A Web
        Client SDK being developed by Greymass and funded by blockchains within the Antelope
        Coalition.
    </BodyText>
    <Button
        data={{
            label: 'View on Github',
            href: '',
        }}
    />
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-m);
    }
</style>
