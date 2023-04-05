<script lang="ts">
    export let title: string
    export let details: string
</script>

<div>
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        ><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line
            x1="12"
            y1="16"
            x2="12.01"
            y2="16"
        /></svg
    >
    <h2>{title}</h2>
    <p>{details}</p>
</div>

<style lang="scss">
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-s);
        text-align: center;
        color: var(--body-text-color);
        margin-block: var(--space-s);
    }

    svg {
        --size: var(--space-3xl);
        width: var(--size);
        height: var(--size);
    }

    h2 {
        font-size: var(--fs-3);
        font-weight: 600;
        margin: 0;
    }

    p {
        font-size: var(--fs-1);
        font-weight: 400;
        margin: 0;
        max-width: var(--measure);
        overflow-wrap: anywhere;
    }
</style>
